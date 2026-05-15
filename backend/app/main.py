from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Ephipany Gstack API", version="0.1.0")


class RiskLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class IncidentIn(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    category: str
    description: str
    consequence: str
    prevented_by: Optional[str] = None


class Incident(IncidentIn):
    id: str


class GapStatement(BaseModel):
    id: str
    statement: str


class RuleIn(BaseModel):
    name: str
    risk: RiskLevel
    threshold: float = Field(ge=0, le=1)
    template: str


class Rule(RuleIn):
    id: str


class MemoryEvent(BaseModel):
    id: str
    timestamp: datetime
    text: str
    topic: str
    confidence: float


class NudgeRequest(BaseModel):
    utterance: str
    topic: str
    confidence: float = Field(ge=0, le=1)


class NudgeResponse(BaseModel):
    intervene: bool
    message: str
    evidence: List[MemoryEvent]


store: Dict[str, List] = {
    "incidents": [],
    "gaps": [],
    "rules": [],
    "events": [
        MemoryEvent(
            id="seed-1",
            timestamp=datetime.utcnow(),
            text="You said morning meds were easiest after breakfast.",
            topic="medication",
            confidence=0.93,
        ),
        MemoryEvent(
            id="seed-2",
            timestamp=datetime.utcnow(),
            text="You call your daughter after appointments.",
            topic="caregiver",
            confidence=0.87,
        ),
    ],
}


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.post("/gstack/ground-truth/incidents", response_model=Incident)
def add_incident(payload: IncidentIn) -> Incident:
    incident = Incident(id=str(uuid4()), **payload.model_dump())
    store["incidents"].append(incident)
    return incident


@app.get("/gstack/ground-truth/incidents", response_model=List[Incident])
def list_incidents() -> List[Incident]:
    return store["incidents"]


@app.post("/gstack/gaps", response_model=GapStatement)
def add_gap(statement: str) -> GapStatement:
    gap = GapStatement(id=str(uuid4()), statement=statement)
    store["gaps"].append(gap)
    return gap


@app.get("/gstack/gaps", response_model=List[GapStatement])
def list_gaps() -> List[GapStatement]:
    return store["gaps"]


@app.post("/gstack/guardrails", response_model=Rule)
def add_guardrail(payload: RuleIn) -> Rule:
    rule = Rule(id=str(uuid4()), **payload.model_dump())
    store["rules"].append(rule)
    return rule


@app.get("/gstack/guardrails", response_model=List[Rule])
def list_guardrails() -> List[Rule]:
    return store["rules"]


@app.post("/memory/events", response_model=MemoryEvent)
def add_memory_event(payload: MemoryEvent) -> MemoryEvent:
    store["events"].append(payload)
    return payload


@app.get("/memory/events", response_model=List[MemoryEvent])
def list_memory_events(topic: Optional[str] = None) -> List[MemoryEvent]:
    events: List[MemoryEvent] = store["events"]
    if topic:
        events = [e for e in events if e.topic == topic]
    return events


@app.post("/intervene", response_model=NudgeResponse)
def intervene(payload: NudgeRequest) -> NudgeResponse:
    topic_events = [e for e in store["events"] if e.topic == payload.topic]
    evidence = sorted(topic_events, key=lambda e: e.confidence, reverse=True)[:2]
    if not evidence:
        return NudgeResponse(
            intervene=False,
            message="I do not have enough prior moments on this topic yet.",
            evidence=[],
        )

    avg_conf = sum(e.confidence for e in evidence) / len(evidence)
    should_nudge = payload.confidence < avg_conf
    if should_nudge:
        msg = (
            "Quick check: this may differ from a prior moment. "
            "Want me to replay the closest memory cue?"
        )
    else:
        msg = "No contradiction detected with high-confidence prior moments."

    return NudgeResponse(intervene=should_nudge, message=msg, evidence=evidence)


@app.post("/gstack/bootstrap")
def bootstrap() -> Dict[str, str]:
    if store["rules"]:
        raise HTTPException(status_code=409, detail="Guardrails already bootstrapped")

    default_rules = [
        RuleIn(
            name="Medication contradiction",
            risk=RiskLevel.high,
            threshold=0.85,
            template="I may have conflicting medication info. Want to verify together?",
        ),
        RuleIn(
            name="Appointment reminder mismatch",
            risk=RiskLevel.medium,
            threshold=0.75,
            template="This sounds different from your last plan. Review your appointment notes?",
        ),
    ]

    for rule in default_rules:
        store["rules"].append(Rule(id=str(uuid4()), **rule.model_dump()))

    return {"status": "bootstrapped"}

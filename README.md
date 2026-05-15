# Ephipany — Gstack Full-Stack Starter

This repository includes a starter full-stack implementation for the Gstack workflow:

- **Ground truth**: collect memory-risk incidents.
- **Gaps**: write explicit failure statements.
- **Guardrails**: define intervention policies.
- **Glue workflow**: run contradiction-aware voice nudges.
- **Gains**: ready endpoints for KPI instrumentation.

## Stack

- Backend: FastAPI (`backend/app/main.py`)
- Frontend: static HTML console (`frontend/index.html`)

## Run backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Run frontend

Open `frontend/index.html` in browser while API is running on port `8000`.

## First API steps

```bash
curl -X POST http://localhost:8000/gstack/bootstrap
curl http://localhost:8000/gstack/guardrails
curl -X POST http://localhost:8000/intervene \
  -H 'Content-Type: application/json' \
  -d '{"topic":"medication","utterance":"I will skip meds","confidence":0.41}'
```

## Next build steps

1. Replace in-memory store with Postgres + pgvector.
2. Add streaming ASR ingestion for microphone/device inputs.
3. Add policy thresholds by risk domain and caregiver escalation.
4. Add metrics store for accepted/dismissed intervention outcomes.

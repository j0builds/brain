# Designing Epiphany as an OS for Curiosity

## Executive summary

Curiosity is best treated as a goal-directed state of information seeking: it spikes when people detect a meaningful, closable gap between what they know and what they want to know (often in the “almost know” zone, not total ignorance). In this state, users invest scarce resources to resolve uncertainty, show stronger anticipatory signals, and encode answers more durably.

For product strategy, that means Epiphany should not be another feed, note app, or generic chatbot. It should be a **curiosity operating system** that:

1. Detects promising knowledge gaps,
2. Helps users traverse them with source-backed exploration,
3. Converts exploration into memory and action,
4. Resurfaces unresolved or newly relevant questions.

The key primitive is not “more content”; it is **better gap selection and closure**.

## Core product thesis

Current products each own only part of the curiosity loop:

- Structured learning: Duolingo, Khan Academy
- Retrieval and source surfacing: Perplexity, Elicit, Semantic Scholar
- Workspace and memory: Obsidian, Notion
- Algorithmic discovery: Pinterest, YouTube, Spotify
- Wonder/exploration: GeoGuessr, Google Earth VR

No major product cleanly owns: **spark → exploration path → trustworthy synthesis → remembered graph → next question**.

## Four non-negotiables for Epiphany

1. **Source provenance as first-class UX**
2. **User-owned curiosity graph**
3. **Calibrated exploration (not infinite feeds)**
4. **Memory loops that resurface and compound**

## Curiosity primitives translated into product design

| Primitive | Product implication | Example metrics |
|---|---|---|
| Gap detection | Ask users what they think they know; estimate closability | Confidence delta, question acceptance |
| Relevance framing | Use prediction/hypothesis prompts | Prompt response rate, prediction completion |
| Exploration cost | Make first useful step cheap; reveal depth progressively | Time-to-first-insight, pre-source abandonment |
| Reward + closure | Reward thread closure, not endless browsing | Session resolution, 24h/7d recall/revisit |
| Memory consolidation | Save context/why-it-mattered, not just links | Save-to-revisit ratio, insight reuse |
| Agency | Always offer broaden/deepen/stop/resurface controls | Control usage, pacing satisfaction |

## Proposed system architecture

- Multimodal spark capture (links/text/voice/image/location)
- Gap estimation layer (novelty/relevance/confidence/closability)
- Curiosity graph (questions, concepts, confidence, sources)
- Exploration planner (broaden/deepen/compare/simulate/map)
- Retrieval + synthesis (web/papers/media/personal memory)
- Experience surfaces (guided path/timeline/map/notebook/dialogue)
- Closure + memory (saved insight, unresolved edge, next question)
- Trust and control (provenance, permissions, privacy, rate limits)

## Interaction model

Favor **branching over scrolling**. Instead of one feed, expose semantically distinct next moves:

- Explain
- Compare
- Map the field
- Show dissenting evidence
- Make beginner-friendly
- Show what I almost understand
- Bookmark for later closure

## Monetization stance

Prioritize:

1. Subscription,
2. Team/education seats,
3. Enterprise/API later.

De-prioritize ad-first models because they push attention extraction over epistemic trust.

## Initial wedge and pricing hypothesis

Start with prosumer knowledge workers, advanced students, and creators already paying for multiple tools.

Suggested (hypothesis-based) early tiers:

- Consumer serious tier: **$8–$15/month**
- Pro tier: **$20–$30/month**
- Team seats above that with collaboration/admin controls

## North-star metric family

- Curiosity Resolution Rate
- Time to First Insight
- Confidence Calibration Lift
- Revisit Yield
- Breadth-with-Coherence Score
- Source Trust Score
- Week-one Activation
- D30 Retention + Paid Conversion

## Suggested roadmap (June 2026 → Nov 2027)

### Foundation
- Curiosity graph + onboarding
- Source-backed exploration MVP
- Multimodal capture hooks

### Product-market fit
- Memory loops and resurfacing
- Personalization and serendipity controls
- Trust layer with contradiction/evidence UI

### Expansion
- Shared spaces and collaborative expeditions
- Curated learning journeys
- Pro tier launch

### Monetization + scale
- Teams/education pilots
- Team billing/admin controls
- Enterprise pilot package

## Strategic sequencing principles

1. Solve capture-to-closure before browse-to-discover.
2. Solve memory compounding before social features.
3. Respect cognitive energy (know when to deepen, broaden, or stop).

## Open questions and limitations

- User pain signals from forums/reviews/Reddit are directionally useful but not statistically representative.
- Some pricing sources are dynamic/region-dependent.
- A follow-on literature pass on intrinsic motivation in RL/developmental robotics would improve adaptive exploration planning.

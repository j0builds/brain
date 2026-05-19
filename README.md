# Ephipany — Gstack Full-Stack Starter (Mobile)

This repository includes a starter full-stack implementation for the Gstack workflow:

- **Ground truth**: collect memory-risk incidents.
- **Gaps**: write explicit failure statements.
- **Guardrails**: define intervention policies.
- **Glue workflow**: run contradiction-aware voice nudges.
- **Gains**: ready endpoints for KPI instrumentation.

## Stack

- Backend API: FastAPI (`backend/app/main.py`)
- Mobile app: React Native + Expo (`mobile/App.js`)

## Run backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Run mobile app

```bash
cd mobile
npm install
npm run start
```

Then open Expo Go on your iOS/Android device and scan the QR code.

> On a physical device, set `API URL` inside the app to your machine's LAN IP, e.g. `http://192.168.1.10:8000`.

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

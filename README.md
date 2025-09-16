라이코 — EV 보조금 서비스 Monorepo (v0.1)

Overview

- Backend: FastAPI stubs under `api/` (SSR/Next.js planned) — Project name: 라이코
- DB: PostgreSQL schema migrations under `db/migrations`
- Core: Calculation engine v0 in `api/app/services/calc_engine.py`
- Docs: Product & engineering plan in `docs/development-plan.md`

Quickstart (local)

1) Docker (API+DB)
- `cd Raikou`
- `docker compose up --build -d`
- Open API docs: http://localhost:8000/docs

2) API (dev, without Docker)
- Python 3.11+
- Install deps: `pip install -r Raikou/api/requirements.txt`
- Run: `uvicorn Raikou.api.app.main:app --reload`

3) Tests
- `PYTHONPATH=Raikou pytest -q Raikou/tests` (DB 불필요)

API (stubs)

- `GET /regions?query=`: region search (stub)
- `GET /programs/{regionId}/current`: active program meta (stub)
- `GET /programs/{id}/status`: snapshot stats (stub)
- `GET /models`: models list (stub)
- `GET /models/{id}/grant?regionId=&msrp=&flags...`: calculates grant using v0 engine
- `POST /alerts`: subscribe (echo)

Next Steps

- Wire DB access layer (SQLAlchemy) to replace stubs.
- Implement ETL workers (`etl-keco`, `etl-evor`, `etl-kem`) and schedule.
- Add Admin CMS (rules CRUD + audit log).
- Scaffold Next.js app for SSR cards (region/model).

Web (Next.js, minimal demo)

- `cd Raikou/web && npm i && npm run dev`
- Open: http://localhost:3000 → 홈 → 보조금 계산기(샘플)에서 API 연동 확인

Env Vars

Env Vars

- `DATABASE_URL` — PostgreSQL connection string
- `OFFLINE_MODE` — true면 스텁 데이터 사용(기본 true)

Disclaimer

- Official notices take precedence. Calculations are for guidance.

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

Web (Next.js)

- 기본(권장): 루트 앱 — `cd Raikou && npm i && npm run dev`
  - 브라우저: http://localhost:3000
  - API 연동: 환경변수 `NEXT_PUBLIC_API_BASE` 설정(예: `http://localhost:8000`). 미설정 시 내장 계산 로직 사용
- 레거시 데모: `web/` 하위 앱 — `cd Raikou/web && npm i && npm run dev`
  - Docker Compose의 `web` 서비스는 현재 `web/` 앱을 빌드함(변경 가능)

Vercel 배포(웹)

- GitHub 연결: `thetason/raikou`
- Project root: 루트 Next 앱 `Raikou/`
- Env (optional): `NEXT_PUBLIC_API_BASE`(API URL). 미설정 시 내장 계산 로직 사용
- 배포 후: `/models`에서 브랜드별 모델 목록, 각 상세에서 계산 확인

Env Vars

- `DATABASE_URL` — PostgreSQL connection string
- `OFFLINE_MODE` — true면 스텁 데이터 사용(기본 true)
- `NEXT_PUBLIC_API_BASE` — 웹에서 사용할 API 베이스 URL (예: `http://localhost:8000`)

메타/소스 엔드포인트

- 커스텀 메타 라우터는 `/meta` 아래에 노출됩니다. 예) `GET /meta/sources/{entity}`

Disclaimer

- Official notices take precedence. Calculations are for guidance.

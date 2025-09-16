from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from . import config as cfg
from .routers import regions, programs, models, alerts, docs


def create_app() -> FastAPI:
    app = FastAPI(title=cfg.API_TITLE, version="0.1.0")
    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*", "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(regions.router, prefix="/regions", tags=["regions"])
    app.include_router(programs.router, prefix="/programs", tags=["programs"])
    app.include_router(models.router, prefix="/models", tags=["models"])
    app.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
    # Mount custom metadata endpoints at /meta to keep /docs for Swagger UI
    app.include_router(docs.router, prefix="/meta", tags=["meta"]) 
    
    @app.get("/healthz")
    def healthz():
        return {"ok": True}

    return app


app = create_app()

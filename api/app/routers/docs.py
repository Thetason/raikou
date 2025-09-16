from fastapi import APIRouter

router = APIRouter()


@router.get("/sources/{entity}")
def get_sources(entity: str):
    return {
        "entity": entity,
        "sources": [
            {"kind": "api", "org": "KECO", "url": "https://data.go.kr", "lastFetched": None},
            {"kind": "web", "org": "ev.or.kr", "url": "https://ev.or.kr", "lastFetched": None},
        ]
    }


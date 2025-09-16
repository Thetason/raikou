import json
import os
from pathlib import Path
from typing import List, Optional, Dict, Any

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "api" / "data"


def _load_json(name: str) -> Any:
    path = DATA_DIR / name
    if not path.exists():
        return None
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


_MODELS_CACHE: Optional[Dict[str, Any]] = None


def load_models_seed() -> Dict[str, Any]:
    global _MODELS_CACHE
    if _MODELS_CACHE is None:
        data = _load_json("models_seed.json") or {"items": []}
        index = {item["id"]: item for item in data.get("items", [])}
        _MODELS_CACHE = {"list": data.get("items", []), "index": index}
    return _MODELS_CACHE


def list_models(filter_q: Optional[str] = None) -> List[Dict[str, Any]]:
    seed = load_models_seed()["list"]
    if not filter_q:
        return seed
    q = filter_q.lower()
    return [m for m in seed if q in m.get("name","" ).lower() or q in m.get("maker","" ).lower()]


def get_model(model_id: str) -> Optional[Dict[str, Any]]:
    return load_models_seed()["index"].get(model_id)


def search_regions(query: str) -> List[Dict[str, Any]]:
    # minimal region seed; can be expanded later
    regions = [
        {"id": "seoul", "sido": "서울특별시", "sigungu": None, "code": "11"},
        {"id": "gyeonggi-seongnam", "sido": "경기도", "sigungu": "성남시", "code": "41131"},
        {"id": "gyeonggi-goyang", "sido": "경기도", "sigungu": "고양시", "code": "41280"},
    ]
    if not query:
        return regions
    q = query.lower()
    return [r for r in regions if q in (r["sido"] or "").lower() or q in (r.get("sigungu") or "").lower()]


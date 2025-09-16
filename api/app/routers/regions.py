from fastapi import APIRouter, Query

router = APIRouter()


@router.get("")
def search_regions(query: str = Query("") ):
    # v0: return stubbed structure
    return {
        "items": [
            {"id": "stub-seoul", "sido": "서울특별시", "sigungu": None, "code": "11"}
        ],
        "query": query,
    }


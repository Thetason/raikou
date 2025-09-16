from fastapi import APIRouter, Query
from typing import List
from ..schemas import Region
from ..services import data_service

router = APIRouter()


@router.get("", response_model=List[Region])
def search_regions(query: str = Query("") ):
    items = data_service.search_regions(query)
    return [Region(**i) for i in items]

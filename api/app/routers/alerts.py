from fastapi import APIRouter
from ..schemas import AlertPayload, AlertResponse

router = APIRouter()


@router.post("", response_model=AlertResponse)
def subscribe_alert(payload: AlertPayload):
    # v0: accept and echo back with id
    return AlertResponse(id="stub-alert-1", status="subscribed", payload=payload)

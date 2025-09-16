from fastapi import APIRouter

router = APIRouter()


@router.post("")
def subscribe_alert(payload: dict):
    # v0: accept and echo back with id
    return {"id": "stub-alert-1", "status": "subscribed", "payload": payload}


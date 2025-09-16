from fastapi import APIRouter
from datetime import datetime, timedelta

router = APIRouter()


@router.get("/{region_id}/current")
def get_current_program(region_id: str):
    now = datetime.utcnow()
    return {
        "regionId": region_id,
        "year": 2025,
        "phase": "H2",
        "start_dt": (now - timedelta(days=10)).isoformat() + "Z",
        "end_dt": (now + timedelta(days=50)).isoformat() + "Z",
        "status": "open",
        "notice_url": "https://example.gov/notice.pdf",
        "countdown_days": 50,
    }


@router.get("/{program_id}/status")
def get_program_status(program_id: str):
    return {
        "programId": program_id,
        "vehicle_type": "passenger",
        "announced_qty": 1000,
        "applied_qty": 640,
        "released_qty": 420,
        "remaining_qty": 360,
        "snapshot_ts": datetime.utcnow().isoformat() + "Z",
    }


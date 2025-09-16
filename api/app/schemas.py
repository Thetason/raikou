from typing import Optional, List, Literal
from pydantic import BaseModel, Field, AnyUrl


class Region(BaseModel):
    id: str
    sido: str
    sigungu: Optional[str] = None
    code: Optional[str] = None


class Program(BaseModel):
    regionId: str
    year: int
    phase: Optional[str] = None
    start_dt: Optional[str] = None
    end_dt: Optional[str] = None
    status: Optional[str] = None
    notice_url: Optional[AnyUrl] = None
    countdown_days: Optional[int] = None


class ProgramStatus(BaseModel):
    programId: str
    vehicle_type: Literal['passenger','van','truck','other'] = 'passenger'
    announced_qty: Optional[int] = 0
    applied_qty: Optional[int] = 0
    released_qty: Optional[int] = 0
    remaining_qty: Optional[int] = 0
    snapshot_ts: str


class ModelItem(BaseModel):
    id: str
    maker: str
    name: str
    msrp_min: Optional[int] = None
    msrp_max: Optional[int] = None


class GrantBreakdown(BaseModel):
    national: int
    local: int
    extra: int
    incentive: int


class GrantResult(BaseModel):
    modelId: str
    regionId: str
    trimId: Optional[str] = None
    msrp: int
    breakdown: GrantBreakdown
    finalPrice: int
    assumptions: dict
    disclaimer: str


class AlertPayload(BaseModel):
    email: Optional[str] = Field(None, description="이메일 채널")
    regionId: Optional[str] = None
    modelId: Optional[str] = None
    threshold: Optional[int] = Field(None, description="잔여율 등 임계값")


class AlertResponse(BaseModel):
    id: str
    status: Literal['subscribed','error']
    payload: AlertPayload


from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from ..services.calc_engine import (
    calculate_grant, LocalRule, ExtraSupport, CalcFlags
)
from ..services import data_service
from ..schemas import ModelItem, GrantResult, GrantBreakdown

router = APIRouter()


@router.get("", response_model=List[ModelItem])
def list_models(filter: Optional[str] = Query(None)):
    items = data_service.list_models(filter)
    return [ModelItem(**i) for i in items]


@router.get("/{model_id}/grant", response_model=GrantResult)
def get_grant(
    model_id: str,
    regionId: str,
    trimId: Optional[str] = None,
    msrp: Optional[int] = None,
    youth: bool = False,
    lowIncome: bool = False,
    multichild: bool = False,
    includeIncentive: bool = False,
    discountAmt: int = 0,
):
    model = data_service.get_model(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="model not found")
    # derive msrp default from seed if not provided
    if msrp is None:
        msrp = int(model.get('msrp_min') or 52_000_000)
    # v0: stubbed national base amount
    national_base = 5_800_000
    # Example local rule: fixed 500,000 KRW
    local_rule = LocalRule(rule_type='fixed', amount_or_ratio=500_000, cap=None)
    # Example extras: youth 20% of national; lowIncome placeholder 10% of national
    extras: list[ExtraSupport] = []
    if youth:
        extras.append(ExtraSupport(type='youth', basis='national_percentage', amount_or_ratio=0.2, cap=None))
    if lowIncome:
        # 임시 정책값(10%) — 참고용. 실제 비율은 공고 기준 반영 필요.
        extras.append(ExtraSupport(type='other', basis='national_percentage', amount_or_ratio=0.1, cap=None))
    flags = CalcFlags(youth=youth, multichild=multichild, include_incentive=includeIncentive, discount_amt=discountAmt)
    result = calculate_grant(
        msrp=msrp,
        national_base_amount=national_base,
        local_rule=local_rule,
        extras=extras,
        flags=flags,
    )
    result.update({
        "modelId": model_id,
        "regionId": regionId,
        "trimId": trimId,
        "msrp": msrp,
    })
    # ensure shape via schemas
    return GrantResult(**result)

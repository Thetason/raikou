from fastapi import APIRouter, Query
from typing import Optional
from ..services.calc_engine import (
    calculate_grant, LocalRule, ExtraSupport, CalcFlags
)

router = APIRouter()


@router.get("")
def list_models(filter: Optional[str] = Query(None)):
    return {
        "items": [
            {"id": "stub-ev6", "maker": "기아", "name": "EV6", "segment": "중형"},
            {"id": "stub-ioniq6", "maker": "현대", "name": "아이오닉 6", "segment": "중형"},
        ],
        "filter": filter,
    }


@router.get("/{model_id}/grant")
def get_grant(
    model_id: str,
    regionId: str,
    trimId: Optional[str] = None,
    msrp: int = 52000000,
    youth: bool = False,
    multichild: bool = False,
    includeIncentive: bool = False,
    discountAmt: int = 0,
):
    # v0: stubbed national base amount; real impl will look up by model_id/year
    national_base = 5_800_000
    # Example local rule: fixed 500,000 KRW
    local_rule = LocalRule(rule_type='fixed', amount_or_ratio=500_000, cap=None)
    # Example extras: youth 20% of national
    extras = [
        ExtraSupport(type='youth', basis='national_percentage', amount_or_ratio=0.2, cap=None)
    ]
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
    return result


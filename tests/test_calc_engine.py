import pytest
from api.app.services.calc_engine import (
    calculate_grant, LocalRule, ExtraSupport, CalcFlags
)


def test_price_band_full_support():
    res = calculate_grant(
        msrp=52_000_000,
        national_base_amount=5_800_000,
        local_rule=None,
        extras=[],
    )
    assert res['breakdown']['national'] == 5_800_000
    assert res['finalPrice'] == 46_200_000


def test_price_band_half_support():
    res = calculate_grant(
        msrp=60_000_000,
        national_base_amount=5_800_000,
        local_rule=None,
        extras=[],
    )
    assert res['breakdown']['national'] == 2_900_000
    assert res['finalPrice'] == 57_100_000


def test_price_band_no_support():
    res = calculate_grant(
        msrp=90_000_000,
        national_base_amount=5_800_000,
        local_rule=None,
        extras=[],
    )
    assert res['breakdown']['national'] == 0
    assert res['finalPrice'] == 90_000_000


def test_local_fixed_and_youth_extra():
    local = LocalRule(rule_type='fixed', amount_or_ratio=500_000)
    extras = [ExtraSupport(type='youth', basis='national_percentage', amount_or_ratio=0.2)]
    flags = CalcFlags(youth=True)
    res = calculate_grant(
        msrp=52_000_000,
        national_base_amount=5_800_000,
        local_rule=local,
        extras=extras,
        flags=flags,
    )
    assert res['breakdown']['national'] == 5_800_000
    assert res['breakdown']['local'] == 500_000
    assert res['breakdown']['extra'] == int(5_800_000 * 0.2)


def test_local_ratio_cap():
    # 50% of national but capped at 300k
    local = LocalRule(rule_type='ratio', amount_or_ratio=0.5, cap=300_000, ref_base='national')
    res = calculate_grant(
        msrp=60_000_000,
        national_base_amount=5_800_000,
        local_rule=local,
    )
    assert res['breakdown']['national'] == 2_900_000
    assert res['breakdown']['local'] == 300_000


def test_incentive_flag():
    flags = CalcFlags(include_incentive=True, discount_amt=2_000_000)
    res = calculate_grant(
        msrp=52_000_000,
        national_base_amount=5_800_000,
        flags=flags,
    )
    # heuristic: 10% of discount (200k) <= 20% of national (1.16M) => 200k
    assert res['breakdown']['incentive'] == 200_000


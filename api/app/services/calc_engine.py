from dataclasses import dataclass
from typing import List, Optional, Dict, Any


@dataclass
class LocalRule:
    rule_type: str  # 'fixed' | 'ratio' | 'formula'
    # for 'fixed': use amount as KRW
    # for 'ratio': amount_or_ratio means ratio against reference (see ref_base)
    # for 'formula': expression string (not evaluated in v0)
    amount_or_ratio: float = 0.0
    cap: Optional[int] = None
    note: Optional[str] = None
    # reference base for ratio: 'national', 'cap580', 'msrp'
    ref_base: str = 'national'


@dataclass
class ExtraSupport:
    type: str  # 'youth','multichild','safety','smallbiz','other'
    basis: str  # 'national_percentage' | 'fixed' | 'local_percentage'
    amount_or_ratio: float
    cap: Optional[int] = None


@dataclass
class CalcFlags:
    youth: bool = False
    multichild: bool = False
    discount_amt: int = 0
    include_incentive: bool = False


PRICE_BANDS = {
    'full_threshold': 5_300_0000,   # 53,000,000 KRW
    'half_threshold': 8_500_0000,   # 85,000,000 KRW
}

NATIONAL_CAP_2025 = 5_800_000  # 5.8M KRW


def apply_price_band(msrp: int, national_base: int) -> int:
    """Apply national price-band rule (100% / 50% / 0%)."""
    if msrp < PRICE_BANDS['full_threshold']:
        return national_base
    if msrp < PRICE_BANDS['half_threshold']:
        return round(national_base * 0.5)
    return 0


def calc_local_support(local_rule: Optional[LocalRule], national_applied: int, msrp: int) -> int:
    if not local_rule:
        return 0
    amt = 0.0
    if local_rule.rule_type == 'fixed':
        amt = local_rule.amount_or_ratio
    elif local_rule.rule_type == 'ratio':
        # ratio of chosen reference base
        ref = 0
        if local_rule.ref_base == 'national':
            ref = national_applied
        elif local_rule.ref_base == 'cap580':
            ref = NATIONAL_CAP_2025
        elif local_rule.ref_base == 'msrp':
            ref = msrp
        amt = ref * float(local_rule.amount_or_ratio)
    elif local_rule.rule_type == 'formula':
        # v0: not evaluating expressions, keep as 0 and note
        amt = 0.0
    # cap
    if local_rule.cap is not None:
        amt = min(amt, local_rule.cap)
    return int(round(max(0.0, amt)))


def calc_extras(flags: CalcFlags, extras: List[ExtraSupport], national_applied: int, local_applied: int) -> int:
    total = 0.0
    for e in extras:
        # filter by flag type when relevant
        if e.type == 'youth' and not flags.youth:
            continue
        if e.type == 'multichild' and not flags.multichild:
            continue

        base = 0.0
        if e.basis == 'national_percentage':
            base = national_applied * float(e.amount_or_ratio)
        elif e.basis == 'local_percentage':
            base = local_applied * float(e.amount_or_ratio)
        elif e.basis == 'fixed':
            base = float(e.amount_or_ratio)
        else:
            base = 0.0
        if e.cap is not None:
            base = min(base, e.cap)
        total += max(0.0, base)
    return int(round(total))


def calc_incentive(flags: CalcFlags, national_applied: int) -> int:
    """Placeholder for 2025 discount-proportional incentive; v0 returns 0 unless enabled.
    Policy details vary; implement as simple min(discount, national_applied*ratio) if enabled.
    """
    if not flags.include_incentive or flags.discount_amt <= 0:
        return 0
    # v0 heuristic: 10% of discount, capped by 20% of national applied.
    incentive = int(round(flags.discount_amt * 0.1))
    return min(incentive, int(round(national_applied * 0.2)))


def calculate_grant(
    *,
    msrp: int,
    national_base_amount: int,
    local_rule: Optional[LocalRule] = None,
    extras: Optional[List[ExtraSupport]] = None,
    flags: Optional[CalcFlags] = None,
) -> Dict[str, Any]:
    """Core calculation independent of persistence.

    Returns: dict with breakdown and final price.
    """
    extras = extras or []
    flags = flags or CalcFlags()

    national = apply_price_band(msrp, national_base_amount)
    local = calc_local_support(local_rule, national, msrp)
    extra = calc_extras(flags, extras, national, local)
    incentive = calc_incentive(flags, national)

    total_subsidy = max(0, national + local + extra + incentive)
    final_price = max(0, msrp - total_subsidy)

    return {
        'breakdown': {
            'national': national,
            'local': local,
            'extra': extra,
            'incentive': incentive,
        },
        'finalPrice': final_price,
        'assumptions': {
            'priceBands': PRICE_BANDS,
            'nationalCap2025': NATIONAL_CAP_2025,
            'notes': [
                'National amount adjusted by MSRP price-bands (100/50/0).',
                'Local rule supports fixed/ratio (formula deferred).',
                'Youth=20% of national should be configured via extras.',
            ],
        },
        'disclaimer': '정책 변동·지자체 공고 우선, 본 서비스는 참고용.'
    }


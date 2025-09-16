export const PRICE_BANDS = {
  full: 53_000_000,
  half: 85_000_000,
}

export function applyPriceBand(msrp: number, nationalBase: number): number {
  if (msrp < PRICE_BANDS.full) return nationalBase
  if (msrp < PRICE_BANDS.half) return Math.round(nationalBase * 0.5)
  return 0
}

export type LocalRule = {
  type: 'fixed' | 'ratio'
  amountOrRatio: number
  cap?: number
  refBase?: 'national' | 'cap580' | 'msrp'
}

export function calcLocal(rule: LocalRule | undefined, nationalApplied: number, msrp: number): number {
  if (!rule) return 0
  let amt = 0
  if (rule.type === 'fixed') amt = rule.amountOrRatio
  else if (rule.type === 'ratio') {
    const ref = rule.refBase === 'msrp' ? msrp : nationalApplied
    amt = ref * rule.amountOrRatio
  }
  if (rule.cap != null) amt = Math.min(amt, rule.cap)
  return Math.max(0, Math.round(amt))
}

export function calcExtras(opts: { youth?: boolean }, nationalApplied: number, localApplied: number): number {
  let total = 0
  if (opts.youth) total += Math.round(nationalApplied * 0.2)
  return total
}

export function calculate(msrp: number, nationalBase: number, rule?: LocalRule, flags?: { youth?: boolean }) {
  const national = applyPriceBand(msrp, nationalBase)
  const local = calcLocal(rule, national, msrp)
  const extra = calcExtras(flags ?? {}, national, local)
  const incentive = 0
  const total = national + local + extra + incentive
  return {
    breakdown: { national, local, extra, incentive },
    finalPrice: Math.max(0, msrp - total),
  }
}


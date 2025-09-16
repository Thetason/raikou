export type Model = {
  id: string
  maker: string
  name: string
  msrpMin?: number
  msrpMax?: number
}

// Mirrors api/data/models_seed.json (msrp range) for offline mode
export const MODELS: Model[] = [
  // Hyundai
  { id: 'hyundai-ioniq5', maker: 'Hyundai', name: 'IONIQ 5', msrpMin: 52_000_000, msrpMax: 65_000_000 },
  { id: 'hyundai-ioniq6', maker: 'Hyundai', name: 'IONIQ 6', msrpMin: 52_000_000, msrpMax: 67_000_000 },
  { id: 'hyundai-kona-ev', maker: 'Hyundai', name: 'KONA Electric', msrpMin: 42_000_000, msrpMax: 52_000_000 },
  // Kia
  { id: 'kia-ev6', maker: 'Kia', name: 'EV6', msrpMin: 52_000_000, msrpMax: 72_000_000 },
  { id: 'kia-ev9', maker: 'Kia', name: 'EV9', msrpMin: 87_000_000, msrpMax: 115_000_000 },
  { id: 'kia-niro-ev', maker: 'Kia', name: 'Niro EV', msrpMin: 48_000_000, msrpMax: 56_000_000 },
  // Tesla
  { id: 'tesla-model-3', maker: 'Tesla', name: 'Model 3', msrpMin: 52_000_000, msrpMax: 69_000_000 },
  { id: 'tesla-model-y', maker: 'Tesla', name: 'Model Y', msrpMin: 59_000_000, msrpMax: 79_000_000 },
  // Volvo
  { id: 'volvo-ex30', maker: 'Volvo', name: 'EX30', msrpMin: 55_000_000, msrpMax: 65_000_000 },
  { id: 'volvo-ex90', maker: 'Volvo', name: 'EX90', msrpMin: 120_000_000, msrpMax: 150_000_000 },
  { id: 'volvo-xc40-recharge', maker: 'Volvo', name: 'XC40 Recharge', msrpMin: 72_000_000, msrpMax: 82_000_000 },
  // Polestar
  { id: 'polestar-2', maker: 'Polestar', name: 'Polestar 2', msrpMin: 55_000_000, msrpMax: 75_000_000 },
  { id: 'polestar-4', maker: 'Polestar', name: 'Polestar 4', msrpMin: 80_000_000, msrpMax: 100_000_000 },
]

export const MAKERS = ['Hyundai', 'Kia', 'Tesla', 'Volvo', 'Polestar']

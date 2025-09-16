export type Model = {
  id: string
  maker: string
  name: string
}

export const MODELS: Model[] = [
  { id: 'hyundai-ioniq5', maker: 'Hyundai', name: 'IONIQ 5' },
  { id: 'hyundai-ioniq6', maker: 'Hyundai', name: 'IONIQ 6' },
  { id: 'hyundai-kona-ev', maker: 'Hyundai', name: 'KONA Electric' },
  { id: 'kia-ev6', maker: 'Kia', name: 'EV6' },
  { id: 'kia-ev9', maker: 'Kia', name: 'EV9' },
  { id: 'kia-niro-ev', maker: 'Kia', name: 'Niro EV' },
  { id: 'tesla-model-3', maker: 'Tesla', name: 'Model 3' },
  { id: 'tesla-model-y', maker: 'Tesla', name: 'Model Y' },
  { id: 'volvo-ex30', maker: 'Volvo', name: 'EX30' },
  { id: 'volvo-ex90', maker: 'Volvo', name: 'EX90' },
  { id: 'volvo-xc40-recharge', maker: 'Volvo', name: 'XC40 Recharge' },
  { id: 'polestar-2', maker: 'Polestar', name: 'Polestar 2' },
  { id: 'polestar-4', maker: 'Polestar', name: 'Polestar 4' }
]

export const MAKERS = ['Hyundai', 'Kia', 'Tesla', 'Volvo', 'Polestar']


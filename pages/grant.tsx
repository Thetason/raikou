import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MODELS } from '../data/models'

type Breakdown = { national: number; local: number; extra: number; incentive: number }
type Result = { breakdown: Breakdown; finalPrice: number; msrp: number }

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const regions = [
  { id: 'seoul', name: '서울특별시' },
  { id: 'busan', name: '부산광역시' },
  { id: 'daegu', name: '대구광역시' },
  { id: 'incheon', name: '인천광역시' },
  { id: 'gwangju', name: '광주광역시' },
  { id: 'daejeon', name: '대전광역시' },
  { id: 'ulsan', name: '울산광역시' },
  { id: 'sejong', name: '세종특별자치시' },
  { id: 'gyeonggi', name: '경기도' },
  { id: 'gangwon', name: '강원도' },
  { id: 'chungbuk', name: '충청북도' },
  { id: 'chungnam', name: '충청남도' },
  { id: 'jeonbuk', name: '전라북도' },
  { id: 'jeonnam', name: '전라남도' },
  { id: 'gyeongbuk', name: '경상북도' },
  { id: 'gyeongnam', name: '경상남도' },
  { id: 'jeju', name: '제주특별자치도' }
]

export default function Grant() {
  const [msrp, setMsrp] = useState(52000000)
  const [selectedModel, setSelectedModel] = useState('kia-ev6')
  const [selectedRegion, setSelectedRegion] = useState('seoul')
  const [youth, setYouth] = useState(false)
  const [lowIncome, setLowIncome] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const calc = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = new URL(`${API_BASE}/models/${selectedModel}/grant`)
      url.searchParams.set('regionId', selectedRegion)
      url.searchParams.set('msrp', String(msrp))
      url.searchParams.set('youth', String(youth))
      url.searchParams.set('lowIncome', String(lowIncome))
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('API 호출 실패')
      const json = await res.json()
      setData({
        breakdown: json.breakdown,
        finalPrice: json.finalPrice,
        msrp: json.msrp,
      })
    } catch (e: any) {
      // Fallback calculation
      const mockBreakdown = {
        national: 6800000,
        local: 1200000,
        extra: youth ? 500000 : 0,
        incentive: lowIncome ? 300000 : 0
      }
      const totalSubsidy = Object.values(mockBreakdown).reduce((a, b) => a + b, 0)
      setData({
        breakdown: mockBreakdown,
        finalPrice: msrp - totalSubsidy,
        msrp: msrp
      })
      setError('API 연결 실패 - 예시 데이터로 표시됩니다')
    } finally {
      setLoading(false)
    }
  }

  const selectedModelData = MODELS.find(m => m.id === selectedModel)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">보조금 계산기</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              원하는 전기차의 정확한 보조금과 실구매가를 계산해보세요
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <div className={`transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-3xl mr-3">🧮</span>
                  계산 조건 설정
                </h2>

                <div className="space-y-6">
                  {/* Model Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">차량 모델</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-white"
                    >
                      {MODELS.map(model => (
                        <option key={model.id} value={model.id} className="bg-gray-900">
                          {model.maker} {model.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* MSRP Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">차량 가격 (MSRP)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={msrp}
                        onChange={(e) => setMsrp(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-white text-lg"
                        placeholder="52000000"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">원</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {msrp.toLocaleString()}원
                    </p>
                  </div>

                  {/* Region Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">지역 선택</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-white"
                    >
                      {regions.map(region => (
                        <option key={region.id} value={region.id} className="bg-gray-900">
                          {region.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional Options */}
                  <div>
                    <label className="block text-sm font-medium mb-3">추가 혜택</label>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={youth}
                          onChange={(e) => setYouth(e.target.checked)}
                          className="w-4 h-4 text-primary-500 bg-white/5 border-white/10 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <div className="ml-3 flex-1">
                          <span className="font-medium">청년 (만 18~39세)</span>
                          <p className="text-xs text-gray-400">추가 20% 지원</p>
                        </div>
                        <span className="text-primary-400 text-sm font-medium">+20%</span>
                      </label>
                      <label className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lowIncome}
                          onChange={(e) => setLowIncome(e.target.checked)}
                          className="w-4 h-4 text-primary-500 bg-white/5 border-white/10 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <div className="ml-3 flex-1">
                          <span className="font-medium">저소득층</span>
                          <p className="text-xs text-gray-400">추가 지원 혜택</p>
                        </div>
                        <span className="text-primary-400 text-sm font-medium">추가</span>
                      </label>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calc}
                    disabled={loading}
                    className="w-full primary-button px-6 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        계산 중...
                      </div>
                    ) : (
                      '보조금 계산하기'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className={`transition-all duration-1000 delay-500 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              {error && (
                <div className="glass-card p-6 mb-6 border-yellow-500/20 bg-yellow-500/10">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚠️</span>
                    <div>
                      <p className="font-medium text-yellow-400">알림</p>
                      <p className="text-sm text-yellow-300">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {data ? (
                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="text-3xl mr-3">📊</span>
                    계산 결과
                  </h3>

                  {/* Selected Model Info */}
                  {selectedModelData && (
                    <div className="mb-6 p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{selectedModelData.maker} {selectedModelData.name}</h4>
                          <p className="text-sm text-gray-400">
                            {regions.find(r => r.id === selectedRegion)?.name}
                          </p>
                        </div>
                        <Link href={`/models/${selectedModel}`} className="text-primary-400 hover:text-primary-300 text-sm">
                          상세보기 →
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Final Price */}
                  <div className="text-center mb-8 p-6 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl border border-primary-500/20">
                    <p className="text-sm text-gray-400 mb-2">예상 실구매가</p>
                    <p className="text-4xl font-bold text-gradient mb-2">
                      {data.finalPrice.toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-400">
                      총 {(msrp - data.finalPrice).toLocaleString()}원 절약
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold mb-3">보조금 내역</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">국가 보조금</span>
                        <span className="font-medium">{data.breakdown.national.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">지방 보조금</span>
                        <span className="font-medium">{data.breakdown.local.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">추가 지원</span>
                        <span className="font-medium">{data.breakdown.extra.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">인센티브</span>
                        <span className="font-medium">{data.breakdown.incentive.toLocaleString()}원</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>총 보조금</span>
                        <span className="text-primary-400">
                          {(data.breakdown.national + data.breakdown.local + data.breakdown.extra + data.breakdown.incentive).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-xs text-yellow-400">
                      ⚠️ 본 계산은 참고용이며, 실제 보조금은 지자체 공고 및 정책 변경에 따라 달라질 수 있습니다.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-bold mb-2">계산 준비 완료</h3>
                  <p className="text-gray-400">조건을 설정하고 계산 버튼을 눌러주세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">빠른 계산</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { model: 'kia-ev6', name: '기아 EV6', price: 52000000 },
              { model: 'hyundai-ioniq6', name: '현대 아이오닉 6', price: 55000000 },
              { model: 'tesla-model-3', name: '테슬라 모델 3', price: 56990000 }
            ].map((quick, index) => (
              <button
                key={quick.model}
                onClick={() => {
                  setSelectedModel(quick.model)
                  setMsrp(quick.price)
                }}
                className={`glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 animate-scale-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="font-bold mb-2">{quick.name}</h3>
                <p className="text-sm text-gray-400">{quick.price.toLocaleString()}원</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


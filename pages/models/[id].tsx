import { useRouter } from 'next/router'
import Link from 'next/link'
import { MODELS } from '../../data/models'
import { useEffect, useState } from 'react'
import { calculate } from '../../lib/calc'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

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

export default function ModelDetail() {
  const router = useRouter()
  const { id } = router.query
  const model = MODELS.find(x => x.id === id)
  const [msrp, setMsrp] = useState(52_000_000)
  const [selectedRegion, setSelectedRegion] = useState('seoul')
  const [youth, setYouth] = useState(false)
  const [lowIncome, setLowIncome] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!model) return
    setLoading(true)
    
    const timer = setTimeout(() => {
      if (API_BASE) {
        const run = async () => {
          try {
            const url = new URL(`${API_BASE}/models/${model.id}/grant`)
            url.searchParams.set('regionId', selectedRegion)
            url.searchParams.set('msrp', String(msrp))
            url.searchParams.set('youth', String(youth))
            url.searchParams.set('lowIncome', String(lowIncome))
            const res = await fetch(url.toString())
            const json = await res.json()
            setResult(json)
          } catch (error) {
            console.error('API 호출 실패:', error)
            setResult(calculate(msrp, 5_800_000, { type: 'fixed', amountOrRatio: 500_000 }, { youth, lowIncome }))
          }
          setLoading(false)
        }
        run()
      } else {
        setResult(calculate(msrp, 5_800_000, { type: 'fixed', amountOrRatio: 500_000 }, { youth, lowIncome }))
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [id, msrp, selectedRegion, youth, lowIncome, model])

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold mb-2">모델을 찾을 수 없습니다</h2>
          <p className="text-gray-400 mb-6">요청하신 차량 모델이 존재하지 않습니다.</p>
          <Link href="/models" className="primary-button px-6 py-3">
            차종 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">홈</Link>
          <span>/</span>
          <Link href="/models" className="hover:text-white transition-colors">차종 탐색</Link>
          <span>/</span>
          <span className="text-white">{model.maker} {model.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="text-8xl mb-6">🚗</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {model.maker} <span className="text-gradient">{model.name}</span>
            </h1>
            <p className="text-xl text-gray-400">
              실시간 보조금 계산으로 정확한 구매가를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator */}
            <div className={`transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">보조금 계산기</h2>
                
                <div className="space-y-6">
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

                  {/* Region Select */}
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

                  {/* Options */}
                  <div>
                    <label className="block text-sm font-medium mb-3">추가 혜택</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={youth}
                          onChange={(e) => setYouth(e.target.checked)}
                          className="w-4 h-4 text-primary-500 bg-white/5 border-white/10 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="ml-3">청년 (만 18~39세)</span>
                        <span className="ml-auto text-primary-400 text-sm">+20%</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={lowIncome}
                          onChange={(e) => setLowIncome(e.target.checked)}
                          className="w-4 h-4 text-primary-500 bg-white/5 border-white/10 rounded focus:ring-primary-500 focus:ring-2"
                        />
                        <span className="ml-3">저소득층</span>
                        <span className="ml-auto text-primary-400 text-sm">추가 지원</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className={`transition-all duration-1000 delay-500 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              {loading ? (
                <div className="glass-card p-8 text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400">계산 중...</p>
                </div>
              ) : result ? (
                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold mb-6">계산 결과</h3>
                  
                  {/* Final Price */}
                  <div className="text-center mb-8 p-6 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl border border-primary-500/20">
                    <p className="text-sm text-gray-400 mb-2">예상 실구매가</p>
                    <p className="text-4xl font-bold text-gradient mb-2">
                      {result.finalPrice.toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-400">
                      총 {(msrp - result.finalPrice).toLocaleString()}원 절약
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold mb-3">보조금 내역</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">국가 보조금</span>
                        <span className="font-medium">{result.breakdown.national.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">지방 보조금</span>
                        <span className="font-medium">{result.breakdown.local.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">추가 지원</span>
                        <span className="font-medium">{result.breakdown.extra.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">인센티브</span>
                        <span className="font-medium">{result.breakdown.incentive.toLocaleString()}원</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>총 보조금</span>
                        <span className="text-primary-400">
                          {(result.breakdown.national + result.breakdown.local + result.breakdown.extra + result.breakdown.incentive).toLocaleString()}원
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
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-400">조건을 설정하면 보조금이 계산됩니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Models */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">다른 {model.maker} 모델</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.filter(m => m.maker === model.maker && m.id !== model.id).slice(0, 3).map((relatedModel, index) => (
              <Link
                key={relatedModel.id}
                href={`/models/${relatedModel.id}`}
                className={`glass-card p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 group animate-scale-in`}
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="text-4xl mb-4 group-hover:animate-float">🚗</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                  {relatedModel.name}
                </h3>
                <p className="text-gray-400 mb-4">{relatedModel.maker}</p>
                <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                  <span>보조금 확인하기</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

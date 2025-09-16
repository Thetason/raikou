import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MAKERS, MODELS } from '../../data/models'

export default function Models() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMaker, setSelectedMaker] = useState('전체')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredModels = MODELS.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.maker.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMaker = selectedMaker === '전체' || model.maker === selectedMaker
    return matchesSearch && matchesMaker
  })

  const groupedModels = MAKERS.reduce((acc, maker) => {
    const makerModels = filteredModels.filter(model => model.maker === maker)
    if (makerModels.length > 0) {
      acc[maker] = makerModels
    }
    return acc
  }, {} as Record<string, typeof MODELS>)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              전기차 <span className="text-gradient">차종 탐색</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              다양한 브랜드의 전기차 모델을 탐색하고 보조금을 확인하세요
            </p>
          </div>

          {/* Search and Filter */}
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="차종명 또는 브랜드 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                  />
                </div>

                {/* Brand Filter */}
                <select
                  value={selectedMaker}
                  onChange={(e) => setSelectedMaker(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-white"
                >
                  <option value="전체">전체 브랜드</option>
                  {MAKERS.map(maker => (
                    <option key={maker} value={maker} className="bg-gray-900">{maker}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {Object.keys(groupedModels).length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-400">다른 검색어를 시도해보세요</p>
            </div>
          ) : (
            Object.entries(groupedModels).map(([maker, models], makerIndex) => (
              <div key={maker} className={`mb-16 animate-fade-in`} style={{animationDelay: `${makerIndex * 200}ms`}}>
                <div className="flex items-center mb-8">
                  <h2 className="text-3xl font-bold mr-4">{maker}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                  <span className="text-gray-400 ml-4">{models.length}개 모델</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {models.map((model, modelIndex) => (
                    <Link
                      key={model.id}
                      href={`/models/${model.id}`}
                      className={`glass-card p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 group animate-scale-in`}
                      style={{animationDelay: `${(makerIndex * 200) + (modelIndex * 100)}ms`}}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary-400 transition-colors">
                            {model.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{maker}</p>
                        </div>
                        <div className="text-3xl group-hover:animate-float">🚗</div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">예상 가격</span>
                          <span className="font-medium">5,000만원대</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">최대 보조금</span>
                          <span className="font-medium text-primary-400">~800만원</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-primary-400 group-hover:text-primary-300 transition-colors font-medium">
                          보조금 계산하기
                        </span>
                        <svg className="w-5 h-5 text-primary-400 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              원하는 차종을 찾지 못하셨나요?
            </h2>
            <p className="text-gray-400 mb-8">
              보조금 계산기에서 직접 차량 정보를 입력해보세요
            </p>
            <Link href="/grant" className="primary-button px-8 py-3 text-lg font-medium">
              보조금 계산기 사용하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative section-padding min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <h1 className="hero-text mb-6">
                전기차 보조금을
                <br />
                <span className="text-gradient">10초 만에</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                지역별, 차종별 맞춤 보조금 정보로 실제 구매가를 미리 확인하세요
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
              <Link href="/models" className="primary-button px-8 py-4 text-lg font-medium">
                차종 탐색하기
              </Link>
              <Link href="/grant" className="glass-button px-8 py-4 text-lg font-medium">
                보조금 계산기
              </Link>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-gradient mb-2">50+</div>
                <div className="text-gray-400">지원 차종</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-gradient mb-2">17</div>
                <div className="text-gray-400">광역시도</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-3xl font-bold text-gradient mb-2">10초</div>
                <div className="text-gray-400">계산 시간</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Models Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">인기 차종</h2>
            <p className="text-xl text-gray-400">가장 많이 검색되는 전기차 모델들</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'kia-ev6', name: 'EV6', maker: '기아', image: '🚗', price: '5,200만원부터' },
              { id: 'hyundai-ioniq6', name: '아이오닉 6', maker: '현대', image: '🚙', price: '5,500만원부터' },
              { id: 'tesla-model-3', name: '모델 3', maker: '테슬라', image: '🏎️', price: '5,699만원부터' }
            ].map((model, index) => (
              <Link key={model.id} href={`/models/${model.id}`} 
                className={`glass-card p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 group animate-scale-in`}
                style={{animationDelay: `${index * 200}ms`}}>
                <div className="text-6xl mb-4 group-hover:animate-float">{model.image}</div>
                <h3 className="text-2xl font-bold mb-2">{model.maker} {model.name}</h3>
                <p className="text-gray-400 mb-4">{model.price}</p>
                <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                  <span>보조금 확인하기</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">왜 라이코인가?</h2>
            <p className="text-xl text-gray-400">복잡한 보조금 계산을 간단하게</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: '빠른 계산',
                description: '복잡한 보조금 규정을 10초 만에 계산합니다'
              },
              {
                icon: '🎯',
                title: '정확한 정보',
                description: '최신 정책과 지자체 공고를 실시간 반영합니다'
              },
              {
                icon: '📱',
                title: '간편한 사용',
                description: '직관적인 인터페이스로 누구나 쉽게 이용 가능합니다'
              },
              {
                icon: '🌍',
                title: '전국 지원',
                description: '17개 광역시도의 모든 보조금 정보를 제공합니다'
              },
              {
                icon: '🔄',
                title: '실시간 업데이트',
                description: '정책 변경사항을 즉시 반영하여 최신 정보를 유지합니다'
              },
              {
                icon: '💡',
                title: '맞춤 추천',
                description: '개인 상황에 맞는 최적의 보조금 조합을 제안합니다'
              }
            ].map((feature, index) => (
              <div key={index} className={`glass-card p-8 text-center animate-scale-in`} style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              지금 바로 <span className="text-gradient">시작하세요</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              원하는 전기차의 실제 구매가를 확인해보세요
            </p>
            <Link href="/models" className="primary-button px-12 py-4 text-xl font-medium">
              차종 탐색하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

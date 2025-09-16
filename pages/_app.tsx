import type { AppProps } from 'next/app'
import Link from 'next/link'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gradient">라이코</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/models" className="text-gray-300 hover:text-white transition-colors">
                차종 탐색
              </Link>
              <Link href="/grant" className="text-gray-300 hover:text-white transition-colors">
                계산기
              </Link>
              <div className="glass-button px-4 py-2">
                <span className="text-xs text-gray-400">프리뷰 • 공고 우선</span>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button className="md:hidden glass-button p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-20">
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-gradient">라이코</span>
              </div>
              <p className="text-gray-400 text-sm max-w-md">
                전기차 보조금을 쉽고 빠르게 계산하세요. 지역별, 차종별 맞춤 정보를 제공합니다.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/models" className="hover:text-white transition-colors">차종 탐색</Link></li>
                <li><Link href="/grant" className="hover:text-white transition-colors">보조금 계산</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">안내</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>공식 출처 기준</li>
                <li>참고용 서비스</li>
                <li>정책/공고 우선</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-gray-500">
            © 2025 라이코. 전기차 보조금 정보는 참고용이며, 공식 공고가 우선됩니다.
          </div>
        </div>
      </footer>
    </div>
  )
}

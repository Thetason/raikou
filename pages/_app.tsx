import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-4">
      <header className="flex items-center justify-between mb-4">
        <strong className="text-lg">라이코</strong>
        <span className="text-xs text-gray-400">프리뷰 • 정확한 금액은 공고 우선</span>
      </header>
      <Component {...pageProps} />
      <footer className="mt-8 text-xs text-gray-400">공식 출처 기준, 참고용. 정책/공고 우선.</footer>
    </div>
  )
}

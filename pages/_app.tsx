import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <header className="header">
        <strong>라이코</strong>
        <span className="badge">프리뷰 • 정확한 금액은 공고 우선</span>
      </header>
      <Component {...pageProps} />
      <footer className="footer">공식 출처 기준, 참고용. 정책/공고 우선.</footer>
    </div>
  )
}

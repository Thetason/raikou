import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{maxWidth:960, margin:'0 auto', padding:16, fontFamily:'system-ui'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <strong>라이코</strong>
        <span style={{fontSize:12, color:'#666'}}>프리뷰 • 정확한 금액은 공고 우선</span>
      </header>
      <Component {...pageProps} />
      <footer style={{marginTop:32, fontSize:12, color:'#666'}}>
        공식 출처 기준, 참고용. 정책/공고 우선.
      </footer>
    </div>
  )
}


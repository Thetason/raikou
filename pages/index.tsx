import Link from 'next/link'

export default function Home() {
  return (
    <main style={{padding: 24, fontFamily: 'system-ui'}}>
      <h1>라이코 — 전기차 보조금</h1>
      <p>빠르게 지역/차종별 예상 실구매가를 확인하세요.</p>
      <ul>
        <li><Link href="/grant">보조금 계산기 (샘플)</Link></li>
        <li><Link href="/models">차종 목록 (현대/기아/테슬라/볼보/폴스타)</Link></li>
      </ul>
    </main>
  )
}


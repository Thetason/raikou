import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid">
      <section className="card card-hero" style={{gridColumn:'1 / -1'}}>
        <h1 style={{margin:'0 0 6px'}}>라이코 — 전기차 보조금</h1>
        <p className="muted">지역·차종별 예상 실구매가를 10초 만에.</p>
        <div className="row" style={{marginTop:12}}>
          <Link className="btn btn-primary" href="/models">차종 탐색</Link>
          <Link className="btn" href="/grant">계산기(샘플)</Link>
        </div>
      </section>
      <section className="card">
        <h3>빠른 시작</h3>
        <ul className="list-plain">
          <li><Link href="/models/kia-ev6">기아 EV6</Link></li>
          <li><Link href="/models/hyundai-ioniq6">현대 아이오닉 6</Link></li>
          <li><Link href="/models/tesla-model-3">테슬라 모델 3</Link></li>
        </ul>
      </section>
      <section className="card">
        <h3>가이드</h3>
        <p className="muted">정책 변동·지자체 공고 우선. 본 서비스는 참고용입니다.</p>
      </section>
    </main>
  )
}

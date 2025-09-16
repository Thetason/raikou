import Link from 'next/link'

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="col-span-full rounded-xl border border-slate-800 bg-gradient-to-b from-gray-900 to-gray-950 p-6">
        <h1 className="text-2xl font-semibold mb-1">라이코 — 전기차 보조금</h1>
        <p className="text-sm text-gray-400">지역·차종별 예상 실구매가를 10초 만에.</p>
        <div className="flex gap-2 mt-3">
          <Link className="px-4 py-2 rounded-lg border border-cyan-700 bg-cyan-900/30 hover:border-cyan-400" href="/models">차종 탐색</Link>
          <Link className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:border-slate-500" href="/grant">계산기(샘플)</Link>
        </div>
      </section>
      <section className="rounded-xl border border-slate-800 bg-gray-950 p-4">
        <h3 className="font-semibold mb-2">빠른 시작</h3>
        <ul className="list-disc list-inside text-sm text-gray-300">
          <li><Link href="/models/kia-ev6">기아 EV6</Link></li>
          <li><Link href="/models/hyundai-ioniq6">현대 아이오닉 6</Link></li>
          <li><Link href="/models/tesla-model-3">테슬라 모델 3</Link></li>
        </ul>
      </section>
      <section className="rounded-xl border border-slate-800 bg-gray-950 p-4">
        <h3 className="font-semibold mb-2">가이드</h3>
        <p className="text-sm text-gray-400">정책 변동·지자체 공고 우선. 본 서비스는 참고용입니다.</p>
      </section>
    </main>
  )
}

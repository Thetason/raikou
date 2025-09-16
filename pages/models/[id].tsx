import { useRouter } from 'next/router'
import Link from 'next/link'
import { MODELS } from '../../data/models'
import { useEffect, useState } from 'react'
import { calculate } from '../../lib/calc'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function ModelDetail() {
  const router = useRouter()
  const { id } = router.query
  const model = MODELS.find(x=>x.id===id)
  const [msrp, setMsrp] = useState(52_000_000)
  const [youth, setYouth] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(()=>{
    if (!model) return
    if (API_BASE) {
      const run = async () => {
        const url = new URL(`${API_BASE}/models/${model.id}/grant`)
        url.searchParams.set('regionId','seoul')
        url.searchParams.set('msrp', String(msrp))
        url.searchParams.set('youth', String(youth))
        const res = await fetch(url.toString())
        const json = await res.json()
        setResult(json)
      }
      run()
    } else {
      setResult(calculate(msrp, 5_800_000, { type:'fixed', amountOrRatio: 500_000 }, {youth}))
    }
  },[id, msrp, youth])

  if (!model) return <main style={{padding:24}}><p>모델을 찾을 수 없습니다.</p></main>

  return (
    <main>
      <p><Link href="/models">← 목록</Link></p>
      <h2 className="text-xl font-semibold mt-1">{model.maker} {model.name}</h2>
      <div className="flex gap-3 items-center mt-3">
        <label className="text-sm">MSRP(원): <input className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900" type="number" value={msrp} onChange={e=>setMsrp(Number(e.target.value))}/></label>
        <label className="text-sm"><input type="checkbox" className="mr-1" checked={youth} onChange={e=>setYouth(e.target.checked)}/> 청년</label>
        <button className="px-4 py-2 rounded-lg border border-cyan-700 bg-cyan-900/30 hover:border-cyan-400" onClick={()=>setMsrp(msrp)}>계산</button>
      </div>
      {result && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-gray-950 p-4">
          <h3 className="mt-0 font-semibold">예상 실구매가</h3>
          <p className="text-3xl font-extrabold">{result.finalPrice.toLocaleString()} 원</p>
          <ul>
            <li>국비: {result.breakdown.national.toLocaleString()}원</li>
            <li>지방비: {result.breakdown.local.toLocaleString()}원</li>
            <li>추가지원: {result.breakdown.extra.toLocaleString()}원</li>
            <li>인센티브: {result.breakdown.incentive.toLocaleString()}원</li>
          </ul>
          <p className="text-xs text-gray-400">가정: 2025 가격구간 규칙, 청년 20% 등. 공고/지침 우선.</p>
        </div>
      )}
    </main>
  )
}

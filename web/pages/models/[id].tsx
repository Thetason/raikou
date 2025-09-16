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
        url.searchParams.set('regionId','stub-seoul')
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
    <main style={{padding:24, fontFamily:'system-ui'}}>
      <p><Link href="/models">← 목록</Link></p>
      <h2>{model.maker} {model.name}</h2>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <label>MSRP(원): <input type="number" value={msrp} onChange={e=>setMsrp(Number(e.target.value))}/></label>
        <label><input type="checkbox" checked={youth} onChange={e=>setYouth(e.target.checked)}/> 청년</label>
      </div>
      {result && (
        <div style={{marginTop:16}}>
          <h3>결과</h3>
          <p>예상 실구매가: {result.finalPrice.toLocaleString()} 원</p>
          <ul>
            <li>국비: {result.breakdown.national.toLocaleString()}원</li>
            <li>지방비: {result.breakdown.local.toLocaleString()}원</li>
            <li>추가지원: {result.breakdown.extra.toLocaleString()}원</li>
            <li>인센티브: {result.breakdown.incentive.toLocaleString()}원</li>
          </ul>
        </div>
      )}
    </main>
  )
}

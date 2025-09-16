import { useEffect, useState } from 'react'

type Breakdown = { national:number; local:number; extra:number; incentive:number }
type Result = { breakdown:Breakdown; finalPrice:number; msrp:number }

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

export default function Grant() {
  const [msrp, setMsrp] = useState(52000000)
  const [youth, setYouth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Result|null>(null)
  const [error, setError] = useState<string| null>(null)

  const calc = async () => {
    setLoading(true); setError(null)
    try {
      const url = new URL(`${API_BASE}/models/kia-ev6/grant`)
      url.searchParams.set('regionId','seoul')
      url.searchParams.set('msrp', String(msrp))
      url.searchParams.set('youth', String(youth))
      const res = await fetch(url.toString())
      if(!res.ok) throw new Error('API 실패')
      const json = await res.json()
      setData({
        breakdown: json.breakdown,
        finalPrice: json.finalPrice,
        msrp: json.msrp,
      })
    } catch(e:any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ /* fire once on mount */ },[])

  return (
    <main style={{padding:24, fontFamily:'system-ui'}}>
      <h2>보조금 계산기 (샘플)</h2>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <label>MSRP(원): <input type="number" value={msrp} onChange={e=>setMsrp(Number(e.target.value))}/></label>
        <label><input type="checkbox" checked={youth} onChange={e=>setYouth(e.target.checked)}/> 청년</label>
        <button onClick={calc} disabled={loading}>{loading? '계산중...' : '계산'}</button>
      </div>
      {error && <p style={{color:'red'}}>에러: {error}</p>}
      {data && (
        <div style={{marginTop:16}}>
          <h3>결과</h3>
          <p>예상 실구매가: {data.finalPrice.toLocaleString()} 원</p>
          <ul>
            <li>국비: {data.breakdown.national.toLocaleString()}원</li>
            <li>지방비: {data.breakdown.local.toLocaleString()}원</li>
            <li>추가지원: {data.breakdown.extra.toLocaleString()}원</li>
            <li>인센티브: {data.breakdown.incentive.toLocaleString()}원</li>
          </ul>
        </div>
      )}
    </main>
  )
}


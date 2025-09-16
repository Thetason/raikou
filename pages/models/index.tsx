import Link from 'next/link'
import { MAKERS, MODELS } from '../../data/models'

export default function Models() {
  return (
    <main style={{padding:24, fontFamily:'system-ui'}}>
      <h2>차종 목록 (MVP)</h2>
      {MAKERS.map(m => (
        <section key={m} style={{marginBottom:16}}>
          <h3>{m}</h3>
          <ul>
            {MODELS.filter(x=>x.maker===m).map(x=> (
              <li key={x.id}><Link href={`/models/${x.id}`}>{x.name}</Link></li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}


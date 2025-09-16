import Link from 'next/link'
import { MAKERS, MODELS } from '../../data/models'

export default function Models() {
  return (
    <main>
      <h2 style={{margin:'8px 0 12px'}}>차종 목록</h2>
      {MAKERS.map(m => (
        <section key={m} className="card" style={{marginBottom:12}}>
          <h3>{m}</h3>
          <div className="grid">
            {MODELS.filter(x=>x.maker===m).map(x=> (
              <Link key={x.id} href={`/models/${x.id}`} className="card">
                <strong>{x.name}</strong>
                <p className="muted">{m}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

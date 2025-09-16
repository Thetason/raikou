import Link from 'next/link'
import { MAKERS, MODELS } from '../../data/models'

export default function Models() {
  return (
    <main>
      <h2 className="mt-2 mb-3 text-xl font-semibold">차종 목록</h2>
      {MAKERS.map(m => (
        <section key={m} className="mb-3 rounded-xl border border-slate-800 bg-gray-950 p-4">
          <h3 className="mb-2 font-semibold">{m}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {MODELS.filter(x=>x.maker===m).map(x=> (
              <Link key={x.id} href={`/models/${x.id}`} className="rounded-lg border border-slate-800 p-3 hover:border-slate-600">
                <div className="font-medium">{x.name}</div>
                <div className="text-xs text-gray-400">{m}</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

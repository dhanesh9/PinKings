import Link from 'next/link';
import { communities, events, leaders } from '@/lib/mock';

export default function ExplorePage() {
  return (
    <main style={{ display:'grid', gap:28 }}>
      <h1 style={{ margin:0 }}>Explore</h1>

      <section>
        <h2 style={{ margin:'0 0 10px' }}>Communities nearby</h2>
        <div style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
          {communities.map(c => (
            <article key={c.slug} style={card}>
              <h3 style={{ margin:'0 0 6px' }}>{c.name}</h3>
              <p style={{ margin:'0 0 10px', color:'#cbd5e1' }}>{c.blurb}</p>
              <p style={{ margin:0, opacity:.8 }}>{c.city} • {c.members} members</p>
              <div style={{ marginTop:12 }}>
                <Link href={`/community/${c.slug}`} style={btnSmall}>View</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ margin:'12px 0 10px' }}>This week</h2>
        <div style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
          {events.map(e => {
            const host = leaders.find(l => l.id === e.hostId)!;
            return (
              <article key={e.id} style={card}>
                <h3 style={{ margin:'0 0 6px' }}>{e.title}</h3>
                <p style={{ margin:0, opacity:.9 }}>{e.when} • {e.where}</p>
                <p style={{ margin:'6px 0 0', color:'#cbd5e1' }}>Host: {host?.name}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

const card: React.CSSProperties = {
  border:'1px solid rgba(148,163,184,0.2)', borderRadius:16, padding:16,
  background:'linear-gradient(180deg,rgba(30,41,59,.6),rgba(2,6,23,.4))'
};
const btnSmall: React.CSSProperties = {
  display:'inline-block', padding:'8px 12px', borderRadius:10,
  border:'1px solid rgba(148,163,184,0.3)'
};

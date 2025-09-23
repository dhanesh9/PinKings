import { leaders } from '@/lib/mock';

export default function LeaderboardPage() {
  const sorted = [...leaders].sort((a,b)=>b.score-a.score);
  return (
    <main>
      <h1 style={{ marginTop:0 }}>Leaderboard</h1>
      <ol style={{ paddingLeft:0, listStyle:'none', display:'grid', gap:10, maxWidth:720 }}>
        {sorted.map((l, i) => (
          <li key={l.id} style={{
            display:'grid', gridTemplateColumns:'56px 1fr 120px', alignItems:'center',
            gap:12, padding:'12px 14px', border:'1px solid rgba(148,163,184,0.25)', borderRadius:12,
            background:'rgba(2,6,23,.35)'
          }}>
            <span style={{ fontSize:24, opacity:.8 }}>#{i+1}</span>
            <div>
              <div style={{ fontWeight:600 }}>{l.name}</div>
              <div style={{ color:'#cbd5e1', fontSize:14 }}>{l.area}</div>
            </div>
            <div style={{ justifySelf:'end', fontWeight:700 }}>{l.score} pts</div>
          </li>
        ))}
      </ol>
    </main>
  );
}

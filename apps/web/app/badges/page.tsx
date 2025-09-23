const BADGES = [
    { name:'Trailblazer', desc:'Hosted 10+ events with 4.5★ feedback' },
    { name:'Connector',  desc:'Brought 50+ first-time attendees' },
    { name:'Safety Steward', desc:'Zero-incident events across 6 months' },
    { name:'Guide', desc:'Mentored 5 new leaders to host' },
    { name:'Helped 25', desc:'25 verified on-ground helps' },
  ];
  
  export default function BadgesPage() {
    return (
      <main>
        <h1 style={{ marginTop:0 }}>Badges</h1>
        <div style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
          {BADGES.map(b => (
            <article key={b.name} style={card}>
              <h3 style={{ margin:'0 0 6px' }}>{b.name}</h3>
              <p style={{ margin:0, color:'#cbd5e1' }}>{b.desc}</p>
            </article>
          ))}
        </div>
      </main>
    );
  }
  
  const card: React.CSSProperties = {
    border:'1px solid rgba(148,163,184,0.2)', borderRadius:16, padding:16,
    background:'linear-gradient(180deg,rgba(30,41,59,.6),rgba(2,6,23,.4))'
  };
  
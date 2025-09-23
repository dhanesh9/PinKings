import { notFound } from 'next/navigation';
import { communities, events } from '@/lib/mock';

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const comm = communities.find(c => c.slug === params.slug);
  if (!comm) return notFound();

  const upcoming = events.filter(e => e.communitySlug === comm.slug);

  return (
    <main style={{ display:'grid', gap:18 }}>
      <h1 style={{ margin:0 }}>{comm.name}</h1>
      <p style={{ color:'#cbd5e1' }}>{comm.blurb}</p>
      <p style={{ opacity:.85 }}>{comm.city} • {comm.members} members</p>

      <h2 style={{ margin:'8px 0' }}>Upcoming</h2>
      <div style={{ display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
        {upcoming.map(e => (
          <article key={e.id} style={card}>
            <h3 style={{ margin:'0 0 6px' }}>{e.title}</h3>
            <p style={{ margin:0 }}>{e.when} • {e.where}</p>
          </article>
        ))}
        {upcoming.length === 0 && <p>No events yet. Be the first to host!</p>}
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  border:'1px solid rgba(148,163,184,0.2)', borderRadius:16, padding:16,
  background:'linear-gradient(180deg,rgba(30,41,59,.6),rgba(2,6,23,.4))'
};

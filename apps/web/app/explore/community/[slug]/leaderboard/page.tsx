import { leaders, categories } from '@/lib/mock';

export default function LeaderboardPage() {
  const categoryMap = new Map(categories.map((category) => [category.id, category.label]));
  const sorted = [...leaders].sort((a, b) => b.score - a.score);

  return (
    <main style={{ display: 'grid', gap: 24 }}>
      <header>
        <h1 style={{ marginTop: 0 }}>Contributor leaderboard</h1>
        <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
          Track who is earning the most pins across events. Scores update as
          hosts create sessions, attract bookings, and collect five-star
          reviews.
        </p>
      </header>
      <ol
        style={{
          paddingLeft: 0,
          listStyle: 'none',
          display: 'grid',
          gap: 12,
          maxWidth: 880,
        }}
      >
        {sorted.map((leader, index) => {
          const price = `${leader.price.min.toFixed(0)}-${leader.price.max.toFixed(0)} USD`;
          const categoryLabels = leader.categories
            .map((id) => categoryMap.get(id))
            .filter(Boolean)
            .join(', ');

          return (
            <li
              key={leader.id}
              style={{
                display: 'grid',
                gap: 12,
                padding: '16px 18px',
                border: '1px solid rgba(148,163,184,0.25)',
                borderRadius: 16,
                background: 'rgba(2,6,23,0.35)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 24, opacity: 0.8 }}>#{index + 1}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{leader.name}</div>
                    <div style={{ color: 'var(--text-soft)', fontSize: 14 }}>
                      {leader.area}
                    </div>
                  </div>
                </div>
                <strong style={{ fontSize: 18 }}>{leader.score} pts</strong>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-soft)', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <span>Badges: {leader.badges.join(' • ')}</span>
                <span>Categories: {categoryLabels}</span>
                <span>Rate: {price}</span>
                <span>Rating: {leader.rating.toFixed(2)} ★</span>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}

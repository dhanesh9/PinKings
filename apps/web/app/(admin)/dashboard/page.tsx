import { Suspense } from 'react';
import { Pill } from '@pin-kings/ui';

async function fetchPlaceholderData() {
  return {
    leaders: 3,
    events: 5,
    reportsOpen: 1,
  };
}

export default async function DashboardPage() {
  const data = await fetchPlaceholderData();

  return (
    <div>
      <h1>Moderation dashboard</h1>
      <p>Track leader applications, events, and trust signals.</p>
      <section style={{ display: 'flex', gap: 24, marginTop: 32 }}>
        <Suspense fallback={<div>Loading stats…</div>}>
          <StatCard title="Active Leaders" value={data.leaders} />
          <StatCard title="Upcoming Events" value={data.events} />
          <StatCard title="Open Reports" value={data.reportsOpen} accent="#f97316" />
        </Suspense>
      </section>
    </div>
  );
}

function StatCard({ title, value, accent = '#22d3ee' }: { title: string; value: number; accent?: string }) {
  return (
    <article
      style={{
        background: 'rgba(30, 64, 175, 0.35)',
        borderRadius: 16,
        padding: 24,
        width: 220,
        boxShadow: '0 12px 24px rgba(15, 23, 42, 0.35)',
        display: 'grid',
        gap: 12,
      }}
    >
      <Pill color={accent}>{title}</Pill>
      <strong style={{ fontSize: 32, lineHeight: 1 }}>{value}</strong>
      <span style={{ fontSize: 12, opacity: 0.8 }}>Updated moments ago</span>
    </article>
  );
}

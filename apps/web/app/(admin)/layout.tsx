export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        minHeight: '100vh',
      }}
    >
      <aside
        style={{
          background: '#111827',
          padding: '24px',
          borderRight: '1px solid rgba(148, 163, 184, 0.2)',
        }}
      >
        <h2>Moderation</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
          <li style={{ marginBottom: 12 }}><a href="/admin/dashboard">Dashboard</a></li>
          <li style={{ marginBottom: 12 }}><a href="/admin/dashboard?tab=leaders">Leaders</a></li>
          <li style={{ marginBottom: 12 }}><a href="/admin/dashboard?tab=events">Events</a></li>
          <li><a href="/admin/dashboard?tab=reports">Reports</a></li>
        </ul>
      </aside>
      <div style={{ padding: '32px' }}>{children}</div>
    </section>
  );
}

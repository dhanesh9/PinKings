import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>PIN-Kings Admin</h1>
      <p>Moderate hyperlocal events and leaders with offline-first integrity.</p>
      <nav style={{ marginTop: 32, display: 'flex', gap: 16 }}>
        <Link href="/admin/dashboard">Go to dashboard</Link>
        <Link href="https://example.com/docs">View documentation</Link>
      </nav>
    </main>
  );
}

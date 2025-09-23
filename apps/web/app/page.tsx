import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Leaders', href: '#leaders' },
  { label: 'Events', href: '#events' },
  { label: 'Matchups', href: '#matchups' },
  { label: 'Admin', href: '/admin/dashboard' },
];

const featureHighlights = [
  {
    label: '01',
    title: 'Weekly Pinboard Battles',
    description:
      'Nominate local champions, vote with pins, and unlock badges that carry real-world influence in your neighborhood.',
  },
  {
    label: '02',
    title: 'Event Momentum Tracking',
    description:
      'Measure how on-the-ground appearances translate into momentum and share insights with your community instantly.',
  },
  {
    label: '03',
    title: 'Creator Tools for Teams',
    description:
      'Build matchups, schedule events, and publish highlight reels with collaborative workflows built for grassroots teams.',
  },
];

const leaderboardPreview = [
  { name: 'Avery Chen', pins: 128, trend: '+12 this week' },
  { name: 'Marcus Silva', pins: 119, trend: '+8 this week' },
  { name: 'Lila Patel', pins: 102, trend: '+19 this week' },
];

const upcomingMatchups = [
  {
    title: 'Downtown vs. Riverside',
    description: 'Cleanup rally + pop-up clinics',
    date: 'Saturday 4PM',
  },
  {
    title: 'Northside vs. Old Quarter',
    description: 'Street art revival throwdown',
    date: 'Sunday 1PM',
  },
  {
    title: 'Bayfront vs. Midtown',
    description: 'Transit riders challenge night',
    date: 'Wednesday 6PM',
  },
];

const eventMoments = [
  {
    title: 'South Park Night Market',
    highlight: '6,200 votes cast from QR kiosks',
  },
  {
    title: 'Community Safety Walk',
    highlight: '45 live check-ins with broadcast clips',
  },
];

export default function HomePage() {
  return (
    <main className="page">
      <header className="site-header" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="PinKings home">
          <span className="brand-badge">PK</span>
          PinKings
        </Link>
        <nav>
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith('#');
              const isActive = link.href === '/';
              const linkClass = isActive ? 'nav-link-active' : undefined;

              return (
                <li key={link.label}>
                  {isAnchor ? (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header-actions">
          <Link href="/login" className="btn btn-secondary">
            Sign In
          </Link>
          <a href="#waitlist" className="btn btn-primary">
            Join the Waitlist
          </a>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="hero-badge">Pin your local legends</span>
          <h1 className="hero-title">
            Rise to the board. <span>Win the block.</span>
          </h1>
          <p className="hero-description">
            PinKings turns hyperlocal leadership into a season of friendly rivalry.
            Track appearances, rally support, and surface the changemakers driving your
            neighborhood forward.
          </p>
          <div className="hero-actions">
            <a href="#leaders" className="btn btn-primary">
              Explore Leaders
            </a>
            <a href="#events" className="btn btn-secondary">
              See Event Highlights
            </a>
            <Link href="/admin/dashboard" className="btn btn-secondary">
              Launch Admin Console
            </Link>
          </div>
        </div>
        <aside className="hero-visual" aria-label="Leaderboard preview">
          <h3>
            Live Leaderboard
            <span style={{ fontSize: 14, opacity: 0.7 }}>•</span>
            <span style={{ color: 'var(--accent-highlight)', fontSize: 14 }}>Beta</span>
          </h3>
          <ul>
            {leaderboardPreview.map((entry) => (
              <li key={entry.name}>
                <div>
                  <strong>{entry.name}</strong>
                  <small>{entry.trend}</small>
                </div>
                <span>{entry.pins} pts</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section id="leaders" className="section">
        <div className="section-header">
          <span className="section-eyebrow">Why it hits different</span>
          <h2 className="section-title">Competition that fuels real community impact</h2>
          <p className="section-description">
            PinKings blends the energy of esports overlays with neighborhood-first metrics.
            Think: weekly matchups, live QR voting, progress dashboards, and shareable recaps
            that keep your supporters in the loop.
          </p>
        </div>
        <div className="feature-grid">
          {featureHighlights.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span>{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link href="/admin/dashboard" className="btn btn-secondary" style={{ width: 'fit-content' }}>
                Build a bracket
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="section">
        <div className="section-header">
          <span className="section-eyebrow">Moments that matter</span>
          <h2 className="section-title">Turn offline energy into shareable stories</h2>
          <p className="section-description">
            PinKings comes ready with event cards, live dashboards, and recap templates so your
            supporters never miss a beat.
          </p>
        </div>
        <div className="leaderboard-list">
          {eventMoments.map((event) => (
            <div key={event.title} className="stat-card">
              <strong>{event.title}</strong>
              <span>{event.highlight}</span>
              <a href="#waitlist" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                Save template
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="matchups" className="section">
        <div className="section-header">
          <span className="section-eyebrow">Matchups on deck</span>
          <h2 className="section-title">Build hype for your next face-off</h2>
        </div>
        <div className="matches-grid">
          {upcomingMatchups.map((matchup) => (
            <div key={matchup.title} className="match-card">
              <h4>{matchup.title}</h4>
              <p>{matchup.description}</p>
              <span style={{ color: 'var(--accent-primary)', fontSize: 14, letterSpacing: '0.08em' }}>
                {matchup.date}
              </span>
              <Link href="/admin/dashboard" className="btn btn-secondary" style={{ width: 'fit-content' }}>
                Manage matchup
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="cta-panel">
        <h3>Ready to crown your next neighborhood MVP?</h3>
        <p>
          Join the PinKings beta crew for early access, curated onboarding, and launch-night perks
          for your community.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <a href="mailto:founders@pinkings.app" className="btn btn-primary">
            Request an invite
          </a>
          <Link href="/admin/dashboard" className="btn btn-secondary">
            Preview the console
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} PinKings. Built for community hype squads.</span>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:team@pinkings.app">Contact</a>
        </div>
      </footer>
    </main>
  );
}

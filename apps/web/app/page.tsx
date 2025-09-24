'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
 codex/review-new-typescript-changes-for-front-end-0sq425
import { categories, events, leaders, locations } from '@/lib/mock';
import type {
  Category,
  Event,
  Leader,
  LocationOption,
  PriceRange,
} from '@/lib/mock';

const currencySymbols: Record<PriceRange['currency'], string> = { USD: '$' };

function formatPrice(price: PriceRange) {
  const symbol = currencySymbols[price.currency] ?? '';
  return `${symbol}${price.min.toFixed(0)} – ${symbol}${price.max.toFixed(0)}`;
}

function spotsLabel(event: Event) {
  const remaining = Math.max(event.seats.total - event.seats.booked, 0);
  if (remaining === 0) {
    return 'Sold out';
  }
  if (remaining <= 5) {
    return `${remaining} spots left`;
  }
  return `${remaining} spots open`;
}

const defaultLocationId = locations[0]?.id ?? 'all';

function buildHostLookup(allLeaders: Leader[]) {
  return allLeaders.reduce<Record<string, Leader>>((acc, leader) => {
    acc[leader.id] = leader;
    return acc;
  }, {});
}


codex/review-new-typescript-changes-for-front-end-zyidlq
import {
  categories,
  events,
  leaders,
  locations,
  type Category,
  type Event,
  type Leader,
  type LocationOption,
  type PriceRange,
} from '@/lib/mock';

const currencySymbols: Record<PriceRange['currency'], string> = { USD: '$' };

import type { Route } from 'next';
type NavLink =
  | { label: string; href: Route; kind?: 'route' }
  | { label: string; href: `#${string}`; kind: 'anchor' };

const navLinks: NavLink[] = [
  { label: 'Home', href: '/', kind: 'route' },
  { label: 'Leaders', href: '#leaders', kind: 'anchor' },
  { label: 'Events', href: '#events', kind: 'anchor' },
  { label: 'Matchups', href: '#matchups', kind: 'anchor' },
  { label: 'Admin', href: '/dashboard', kind: 'route' },
];
main

function formatPrice(price: PriceRange) {
  const symbol = currencySymbols[price.currency] ?? '';
  return `${symbol}${price.min.toFixed(0)} – ${symbol}${price.max.toFixed(0)}`;
}

function spotsLabel(event: Event) {
  const remaining = Math.max(event.seats.total - event.seats.booked, 0);
  if (remaining === 0) {
    return 'Sold out';
  }
  if (remaining <= 5) {
    return `${remaining} spots left`;
  }
  return `${remaining} spots open`;
}

const defaultLocationId = locations[0]?.id ?? 'all';

function buildHostLookup(allLeaders: Leader[]) {
  return allLeaders.reduce<Record<string, Leader>>((acc, leader) => {
    acc[leader.id] = leader;
    return acc;
  }, {});
}

 main
const leaderLookup = buildHostLookup(leaders);

function getLocationLabel(id: string | 'all') {
  if (id === 'all') return 'you';
  const match = locations.find((location) => location.id === id);
  return match ? match.city : 'you';
}

function categoryLabel(categoryId: string | 'all') {
  if (categoryId === 'all') return 'all events';
  const match = categories.find((category) => category.id === categoryId);
  return match ? match.label : 'all events';
}

const navLinks = [
  { label: 'Browse', href: '/explore' as const },
  { label: 'Communities', href: '/explore#communities' as const },
  { label: 'Create an event', href: '/explore#create' as const },
];

export default function HomePage() {
 codex/review-new-typescript-changes-for-front-end-0sq425
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>(defaultLocationId);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const matchesLocation =
        selectedLocation === 'all' || event.locationId === selectedLocation;
      const matchesCategory =
        selectedCategory === 'all' || event.categoryId === selectedCategory;

      if (!matchesLocation || !matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const locationName = locations.find((loc) => loc.id === event.locationId)?.city ?? '';
      const hostNames = event.hostIds
        .map((id) => leaderLookup[id]?.name ?? '')
        .join(' ');

      const haystack = `${event.title} ${event.summary} ${locationName} ${hostNames}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  const sortedLeaders = useMemo(() => {
    const relevantLeaders = leaders.filter((leader) => {
      const matchesCategory =
        selectedCategory === 'all' || leader.categories.includes(selectedCategory);
      const matchesLocation =
        selectedLocation === 'all' || leader.locations.includes(selectedLocation);
      return matchesCategory && matchesLocation;
    });

    return relevantLeaders.sort((a, b) => {
      const badgeDelta = b.badges.length - a.badges.length;
      if (badgeDelta !== 0) return badgeDelta;
      return b.rating - a.rating;
    });
  }, [selectedCategory, selectedLocation]);

  const topLeader = sortedLeaders[0];
  const locationLabel = getLocationLabel(selectedLocation);
  const activeCategoryLabel = categoryLabel(selectedCategory);

  return (
    <main className="home-page">
      <header className="home-header">
        <Link href="/" className="home-brand">
          <span>PinKings Meetups</span>
        </Link>
        <nav className="home-nav" aria-label="Primary">

 codex/review-new-typescript-changes-for-front-end-zyidlq
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>(defaultLocationId);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const matchesLocation =
        selectedLocation === 'all' || event.locationId === selectedLocation;
      const matchesCategory =
        selectedCategory === 'all' || event.categoryId === selectedCategory;

      if (!matchesLocation || !matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const locationName = locations.find((loc) => loc.id === event.locationId)?.city ?? '';
      const hostNames = event.hostIds
        .map((id) => leaderLookup[id]?.name ?? '')
        .join(' ');

      const haystack = `${event.title} ${event.summary} ${locationName} ${hostNames}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  const sortedLeaders = useMemo(() => {
    const relevantLeaders = leaders.filter((leader) => {
      const matchesCategory =
        selectedCategory === 'all' || leader.categories.includes(selectedCategory);
      const matchesLocation =
        selectedLocation === 'all' || leader.locations.includes(selectedLocation);
      return matchesCategory && matchesLocation;
    });

    return relevantLeaders.sort((a, b) => {
      const badgeDelta = b.badges.length - a.badges.length;
      if (badgeDelta !== 0) return badgeDelta;
      return b.rating - a.rating;
    });
  }, [selectedCategory, selectedLocation]);

  const topLeader = sortedLeaders[0];
  const locationLabel = getLocationLabel(selectedLocation);
  const activeCategoryLabel = categoryLabel(selectedCategory);

  return (
    <main className="home-page">
      <header className="home-header">
        <Link href="/" className="home-brand">
          <span>PinKings Meetups</span>
        </Link>
        <nav className="home-nav" aria-label="Primary">

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
              const isAnchor = link.kind === 'anchor';
              const isActive = !isAnchor && link.href === '/';
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
          <a href="/login" className="btn btn-secondary">
            Sign In
          </a>
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
            <Link href="/dashboard" className="btn btn-secondary">
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
main
 main
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/explore#create" className="btn btn-primary">
          Host an event
        </Link>
      </header>

      <section className="search-section" aria-labelledby="search-heading">
        <div className="search-intro">
          <h1 id="search-heading">Find your next meetup</h1>
          <p>
            Browse workshops, training sessions, and community gatherings. Filter by location or
            event type to see what's happening nearby.
          </p>
        </div>
 codex/review-new-typescript-changes-for-front-end-0sq425

codex/review-new-typescript-changes-for-front-end-zyidlq
 main
        <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="search-field">
            <span>Search by event or host</span>
            <input
              type="search"
              placeholder="Try “AI build night” or “boxing”"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <div className="search-controls">
            <label className="search-field">
              <span>Location</span>
              <select
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
              >
                <option value="all">All locations</option>
                {locations.map((locationOption: LocationOption) => (
                  <option key={locationOption.id} value={locationOption.id}>
                    {locationOption.label}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="category-filter">
              <legend>Event type</legend>
              <div className="category-options">
                <button
                  type="button"
                  className={selectedCategory === 'all' ? 'chip chip-active' : 'chip'}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </button>
                {categories.map((category: Category) => (
                  <button
                    type="button"
                    key={category.id}
                    className={selectedCategory === category.id ? 'chip chip-active' : 'chip'}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </form>
 codex/review-new-typescript-changes-for-front-end-0sq425

        <div className="feature-grid">
          {featureHighlights.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span>{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link href="/dashboard" className="btn btn-secondary" style={{ width: 'fit-content' }}>
                Build a bracket
              </Link>
            </article>
          ))}
        </div>
 main
 main
      </section>

      <section className="home-layout">
        <div className="events-column" aria-live="polite">
          <header className="section-heading">
            <div>
              <h2>Events around {locationLabel}</h2>
              <p>
                Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'result' : 'results'} for {activeCategoryLabel}.
              </p>
            </div>
            <Link href="/explore" className="link subtle">
              Browse all
            </Link>
          </header>
 codex/review-new-typescript-changes-for-front-end-0sq425

          <div className="event-list">
            {filteredEvents.map((event) => {
              const hostNames = event.hostIds
                .map((hostId) => leaderLookup[hostId]?.name)
                .filter(Boolean)
                .join(', ');
              const location = locations.find((loc) => loc.id === event.locationId);
              return (
                <article key={event.id} className="event-card">
                  <header>
                    <span className="event-date">{event.when}</span>
                    <h3>{event.title}</h3>
                    <p>{event.summary}</p>
                  </header>
                  <dl>
                    <div>
                      <dt>Hosted by</dt>
                      <dd>{hostNames}</dd>
                    </div>
                    <div>
                      <dt>Format</dt>
                      <dd>{event.format}</dd>
                    </div>
                    <div>
                      <dt>Skill level</dt>
                      <dd>{event.skillLevel}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{location?.label}</dd>
                    </div>
                  </dl>
                  <footer>
                    <span>{formatPrice(event.price)}</span>
                    <span>{spotsLabel(event)}</span>
                    <Link href={`/explore/community/${event.communitySlug}`} className="link">
                      View details
                    </Link>
                  </footer>
                </article>
              );
            })}



          <div className="event-list">
            {filteredEvents.map((event) => {
              const hostNames = event.hostIds
                .map((hostId) => leaderLookup[hostId]?.name)
                .filter(Boolean)
                .join(', ');
              const location = locations.find((loc) => loc.id === event.locationId);
              return (
                <article key={event.id} className="event-card">
                  <header>
                    <span className="event-date">{event.when}</span>
                    <h3>{event.title}</h3>
                    <p>{event.summary}</p>
                  </header>
                  <dl>
                    <div>
                      <dt>Hosted by</dt>
                      <dd>{hostNames}</dd>
                    </div>
                    <div>
                      <dt>Format</dt>
                      <dd>{event.format}</dd>
                    </div>
                    <div>
                      <dt>Skill level</dt>
                      <dd>{event.skillLevel}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{location?.label}</dd>
                    </div>
                  </dl>
                  <footer>
                    <span>{formatPrice(event.price)}</span>
                    <span>{spotsLabel(event)}</span>
                    <Link href={`/explore/community/${event.communitySlug}`} className="link">
                      View details
                    </Link>
                  </footer>
                </article>
              );
            })}

 main
            {filteredEvents.length === 0 && (
              <div className="empty-state">
                <h3>No events found</h3>
                <p>Try a different search term or adjust your filters.</p>
              </div>
            )}
          </div>
        </div>
 codex/review-new-typescript-changes-for-front-end-0sq425

codex/review-new-typescript-changes-for-front-end-zyidlq
 main

        <aside className="leaderboard-column" aria-labelledby="leaders-heading">
          <header>
            <h2 id="leaders-heading">Top leaders nearby</h2>
            <p>Sorted by badge count for your selected event type.</p>
          </header>

          {topLeader ? (
            <article className="leader-highlight">
              <span className="leader-rank">#1</span>
              <div>
                <h3>{topLeader.name}</h3>
                <p>{topLeader.bio}</p>
                <div className="leader-meta">
                  <span>{topLeader.badges.join(' • ')}</span>
                  <span>
                    {topLeader.rating.toFixed(2)} rating • {topLeader.sessionsHosted} sessions hosted
                  </span>
                </div>
              </div>
            </article>
          ) : (
            <div className="empty-state">
              <h3>Pick a category to see leaders</h3>
              <p>Set your filters to discover instructors who host that style of event.</p>
 codex/review-new-typescript-changes-for-front-end-0sq425
            </div>
          )}

          {sortedLeaders.length > 1 && (
            <ol className="leader-list">
              {sortedLeaders.slice(1, 5).map((leader, index) => (
                <li key={leader.id}>
                  <span className="leader-rank">#{index + 2}</span>
                  <div>
                    <strong>{leader.name}</strong>
                    <span>{leader.badges.join(' • ')}</span>
                    <small>
                      {leader.price.min === leader.price.max
                        ? `$${leader.price.min} per session`
                        : `${formatPrice(leader.price)} per session`}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </section>

      <section className="cta-section">
        <div>
          <h2>Bring your community together</h2>
          <p>
            Launch a meetup, workshop, or training session in minutes. Share details, manage RSVPs,
            and spotlight your instructors.
          </p>

        <div className="matches-grid">
          {upcomingMatchups.map((matchup) => (
            <div key={matchup.title} className="match-card">
              <h4>{matchup.title}</h4>
              <p>{matchup.description}</p>
              <span style={{ color: 'var(--accent-primary)', fontSize: 14, letterSpacing: '0.08em' }}>
                {matchup.date}
              </span>
              <Link href="/dashboard" className="btn btn-secondary" style={{ width: 'fit-content' }}>
                Manage matchup
              </Link>
 main
            </div>
          )}

codex/review-new-typescript-changes-for-front-end-zyidlq
          {sortedLeaders.length > 1 && (
            <ol className="leader-list">
              {sortedLeaders.slice(1, 5).map((leader, index) => (
                <li key={leader.id}>
                  <span className="leader-rank">#{index + 2}</span>
                  <div>
                    <strong>{leader.name}</strong>
                    <span>{leader.badges.join(' • ')}</span>
                    <small>
                      {leader.price.min === leader.price.max
                        ? `$${leader.price.min} per session`
                        : `${formatPrice(leader.price)} per session`}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </section>

      <section className="cta-section">
        <div>
          <h2>Bring your community together</h2>
          <p>
            Launch a meetup, workshop, or training session in minutes. Share details, manage RSVPs,
            and spotlight your instructors.
          </p>

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
          <Link href="/dashboard" className="btn btn-secondary">
            Preview the console
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} PinKings. Built for community hype squads.</span>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="mailto:team@pinkings.app">Contact</a>
 main
 main
        </div>
        <Link href="/explore#create" className="btn btn-primary">
          Create an event
        </Link>
      </section>
    </main>
  );
}

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
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

            {filteredEvents.length === 0 && (
              <div className="empty-state">
                <h3>No events found</h3>
                <p>Try a different search term or adjust your filters.</p>
              </div>
            )}
          </div>
        </div>

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
        </div>
        <Link href="/explore#create" className="btn btn-primary">
          Create an event
        </Link>
      </section>
    </main>
  );
}

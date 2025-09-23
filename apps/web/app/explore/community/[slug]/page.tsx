import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  categories,
  communities,
  events,
  leaders,
  locations,
  type Event,
  type Leader,
} from '@/lib/mock';

const cardStyle: CSSProperties = {
  border: '1px solid rgba(148,163,184,0.18)',
  borderRadius: 20,
  background: 'linear-gradient(180deg, rgba(15,23,42,0.82), rgba(2,6,23,0.6))',
  padding: 20,
  display: 'grid',
  gap: 12,
};

const pillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 999,
  padding: '6px 12px',
  fontSize: 13,
  border: '1px solid rgba(148,163,184,0.26)',
  color: 'rgba(226,232,240,0.82)',
};

const currencySymbols: Record<string, string> = { USD: '$' };

function formatPrice(event: Event) {
  const symbol = currencySymbols[event.price.currency] ?? '';
  return `${symbol}${event.price.min.toFixed(0)} – ${symbol}${event.price.max.toFixed(0)}`;
}

function formatLeaderPrice(leader: Leader) {
  const symbol = currencySymbols[leader.price.currency] ?? '';
  return `${symbol}${leader.price.min.toFixed(0)} – ${symbol}${leader.price.max.toFixed(0)}`;
}

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const community = communities.find((entry) => entry.slug === params.slug);
  if (!community) return notFound();

  const location = locations.find((entry) => entry.id === community.primaryLocationId);
  const categoryLabels = community.categoryIds
    .map((id) => categories.find((category) => category.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  const communityEvents = events.filter((event) => event.communitySlug === community.slug);
  const leaderMap = new Map(leaders.map((leader) => [leader.id, leader]));

  const featuredContributors = leaders
    .filter((leader) => {
      const sharesCategory = leader.categories.some((id) =>
        community.categoryIds.includes(id)
      );
      const coversLocation = leader.locations.includes(community.primaryLocationId);
      return sharesCategory && coversLocation;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <main style={{ display: 'grid', gap: 28, paddingBottom: 64 }}>
      <header style={{ display: 'grid', gap: 12 }}>
        <Link
          href="/explore"
          style={{ fontSize: 13, color: 'var(--text-soft)', width: 'fit-content' }}
        >
          ← Back to explore
        </Link>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>{community.name}</h1>
          <span style={{ ...pillStyle, borderColor: 'rgba(56,189,248,0.35)' }}>
            {community.members} members
          </span>
        </div>
        <p style={{ margin: 0, color: 'var(--text-soft)', maxWidth: 720 }}>
          {community.blurb}
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14 }}>
          <span style={{ color: 'var(--text-soft)' }}>
            {location?.label ?? `${community.city}, CA`}
          </span>
          <span style={{ color: 'var(--text-soft)' }}>Focus: {categoryLabels || 'Community experiments'}</span>
        </div>
      </header>

      <section style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>Upcoming sessions</h2>
          <span style={{ fontSize: 13, opacity: 0.75 }}>
            {communityEvents.length} scheduled
          </span>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          {communityEvents.map((event) => {
            const hosts = event.hostIds
              .map((id) => leaderMap.get(id)?.name)
              .filter(Boolean)
              .join(', ');
            const eventLocation = locations.find((entry) => entry.id === event.locationId);

            return (
              <article key={event.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'grid', gap: 6 }}>
                    <span style={{ fontSize: 13, opacity: 0.7 }}>
                      {event.when} • {event.timeslot}
                    </span>
                    <h3 style={{ margin: 0 }}>{event.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-soft)' }}>{event.summary}</p>
                  </div>
                  <span style={{ ...pillStyle, border: 'none', background: 'rgba(56,189,248,0.16)' }}>
                    {categories.find((category) => category.id === event.categoryId)?.label ?? 'Community event'}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-soft)', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  <span>{eventLocation?.label ?? 'Local venue'} • {event.venue}</span>
                  <span>Format: {event.format}</span>
                  <span>Level: {event.skillLevel}</span>
                  <span>Price: {formatPrice(event)}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-soft)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <span>
                    {event.seats.booked}/{event.seats.total} spots booked
                  </span>
                  <span>Organizers: {hosts || 'To be announced'}</span>
                </div>
              </article>
            );
          })}
          {communityEvents.length === 0 && (
            <article style={cardStyle}>
              <h3 style={{ margin: '0 0 8px' }}>Be the first to host</h3>
              <p style={{ margin: 0, color: 'var(--text-soft)' }}>
                This community is looking for its next event. Bring your idea and claim the top spot on the contributor board.
              </p>
            </article>
          )}
        </div>
      </section>

      <section style={{ display: 'grid', gap: 16 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>Contributors in this lane</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {featuredContributors.map((leader) => (
            <article
              key={leader.id}
              style={{
                border: '1px solid rgba(148,163,184,0.18)',
                borderRadius: 16,
                padding: 16,
                background: 'rgba(15,23,42,0.65)',
                display: 'grid',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{leader.name}</strong>
                <span style={{ fontSize: 13, opacity: 0.75 }}>{leader.score} pts</span>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                {leader.badges.join(' • ')}
              </span>
              <span style={{ fontSize: 13 }}>
                Rate: {formatLeaderPrice(leader)} • Rating {leader.rating.toFixed(2)} ★
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                {leader.bio}
              </span>
            </article>
          ))}
          {featuredContributors.length === 0 && (
            <article style={cardStyle}>
              <h3 style={{ margin: '0 0 8px' }}>No contributors yet</h3>
              <p style={{ margin: 0, color: 'var(--text-soft)' }}>
                Invite instructors to stake their claim in this category and unlock exclusive badges.
              </p>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}

'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import type {
  Category,
  Event,
  Leader,
  LocationOption,
  PriceRange,
} from '@/lib/mock';
import {
  categories,
  communities,
  events,
  leaders,
  locations,
} from '@/lib/mock';

const currencySymbols: Record<string, string> = { USD: '$' };

const defaultCategoryId = categories[0]?.id ?? '';
const defaultLocationId = locations[0]?.id ?? '';

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

type EventFormState = {
  title: string;
  summary: string;
  categoryId: string;
  locationId: string;
  date: string;
  start: string;
  duration: string;
  priceMin: string;
  priceMax: string;
  venue: string;
  format: Event['format'];
  skillLevel: Event['skillLevel'];
};

type DraftPreview = {
  title: string;
  summary: string;
  schedule: string;
  duration?: string;
  locationLabel: string;
  priceLabel: string;
  categoryLabel: string;
  format: string;
  skillLevel: string;
};

function formatPriceRange(price: PriceRange) {
  const symbol = currencySymbols[price.currency] ?? '';
  return `${symbol}${price.min.toFixed(0)} – ${symbol}${price.max.toFixed(0)}`;
}

function formatDraftPrice(minInput: string, maxInput: string, currency: string = 'USD') {
  const symbol = currencySymbols[currency] ?? '';
  const parsedMin = minInput.trim() === '' ? undefined : Number(minInput);
  const parsedMax = maxInput.trim() === '' ? undefined : Number(maxInput);
  const hasMin = typeof parsedMin === 'number' && Number.isFinite(parsedMin);
  const hasMax = typeof parsedMax === 'number' && Number.isFinite(parsedMax);

  if (hasMin && hasMax) {
    return `${symbol}${parsedMin.toFixed(0)} – ${symbol}${parsedMax.toFixed(0)}`;
  }
  if (hasMin) {
    return `From ${symbol}${parsedMin.toFixed(0)}`;
  }
  if (hasMax) {
    return `Up to ${symbol}${parsedMax.toFixed(0)}`;
  }
  return 'Set your price';
}

function percentFilled(event: Event) {
  if (event.seats.total === 0) return 0;
  return Math.round((event.seats.booked / event.seats.total) * 100);
}

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [categorySearch, setCategorySearch] = useState('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [draftPreview, setDraftPreview] = useState<DraftPreview | null>(null);
  const [formState, setFormState] = useState<EventFormState>({
    title: '',
    summary: '',
    categoryId: defaultCategoryId,
    locationId: defaultLocationId,
    date: '',
    start: '',
    duration: '90',
    priceMin: '',
    priceMax: '',
    venue: '',
    format: 'In person',
    skillLevel: 'All levels',
  });

  const categoryMap = useMemo(
    () => new Map<string, Category>(categories.map((cat) => [cat.id, cat])),
    []
  );
  const locationMap = useMemo(
    () => new Map<string, LocationOption>(locations.map((loc) => [loc.id, loc])),
    []
  );
  const leaderMap = useMemo(
    () => new Map<string, Leader>(leaders.map((leader) => [leader.id, leader])),
    []
  );
  const communityMap = useMemo(
    () => new Map(communities.map((community) => [community.slug, community])),
    []
  );

  const normalizedSearch = categorySearch.trim().toLowerCase();

  const visibleCategories = useMemo(() => {
    if (!normalizedSearch) return categories;
    return categories.filter((category) => {
      const haystack = [
        category.label,
        category.tagline,
        ...category.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [normalizedSearch]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === 'all' || event.categoryId === selectedCategory;
      const matchesLocation =
        selectedLocation === 'all' || event.locationId === selectedLocation;
      const matchesSearch =
        !normalizedSearch ||
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.summary.toLowerCase().includes(normalizedSearch) ||
        (categoryMap.get(event.categoryId)?.label
          .toLowerCase()
          .includes(normalizedSearch) ?? false);
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [selectedCategory, selectedLocation, normalizedSearch, categoryMap]);

  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        community.categoryIds.includes(selectedCategory);
      const matchesLocation =
        selectedLocation === 'all' ||
        community.primaryLocationId === selectedLocation;
      return matchesCategory && matchesLocation;
    });
  }, [selectedCategory, selectedLocation]);

  const contributorShortlist = useMemo(() => {
    return leaders
      .filter((leader) => {
        const matchesLocation =
          selectedLocation === 'all' || leader.locations.includes(selectedLocation);
        const matchesCategory =
          selectedCategory === 'all' || leader.categories.includes(selectedCategory);
        const matchesSearch =
          !normalizedSearch ||
          leader.name.toLowerCase().includes(normalizedSearch) ||
          leader.expertise.some((item) =>
            item.toLowerCase().includes(normalizedSearch)
          ) ||
          leader.categories.some((id) =>
            categoryMap.get(id)?.label.toLowerCase().includes(normalizedSearch) ?? false
          );
        return matchesLocation && matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [selectedCategory, selectedLocation, normalizedSearch, categoryMap]);

  const activeLocationLabel =
    selectedLocation === 'all'
      ? 'Across the Bay Area'
      : locationMap.get(selectedLocation)?.label ?? 'Unknown location';
  const activeCategoryLabel =
    selectedCategory === 'all'
      ? 'Every format'
      : categoryMap.get(selectedCategory)?.label ?? 'Events';

  const handleCategorySelect = (categoryId: string | 'all') => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') {
      setFormState((prev) => ({ ...prev, categoryId }));
    }
  };

  const handleLocationSelect = (value: string) => {
    setSelectedLocation(value);
    if (value !== 'all') {
      setFormState((prev) => ({ ...prev, locationId: value }));
    }
  };

  const handleFormFieldChange = (
    field: keyof EventFormState
  ) =>
    (
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>
    ) => {
      const value = event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleCreateEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.title || !formState.date || !formState.start) {
      setFormMessage('Add a title and schedule to generate your draft preview.');
      setDraftPreview(null);
      return;
    }

    const locationLabel =
      locationMap.get(formState.locationId)?.label ?? 'Location coming soon';
    const categoryLabel =
      categoryMap.get(formState.categoryId)?.label ?? 'Community event';

    setDraftPreview({
      title: formState.title,
      summary:
        formState.summary ||
        'Bring your community together—add more details before publishing.',
      schedule: `${formState.date} • ${formState.start} PT`,
      duration: formState.duration
        ? `${formState.duration} minute session`
        : undefined,
      locationLabel,
      priceLabel: formatDraftPrice(formState.priceMin, formState.priceMax),
      categoryLabel,
      format: formState.format,
      skillLevel: formState.skillLevel,
    });
    setFormMessage('Draft ready—share it with your crew for approval.');
  };

  return (
    <main style={{ display: 'grid', gap: 32, paddingBottom: 80 }}>
      <section
        style={{
          display: 'grid',
          gap: 16,
          padding: '24px 0 8px',
        }}
      >
        <span style={{ fontSize: 13, letterSpacing: '0.08em', opacity: 0.72 }}>
          PLAN & COMPETE
        </span>
        <h1 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 48px)' }}>
          Build events, match with instructors, own your block.
        </h1>
        <p style={{ margin: 0, color: 'var(--text-soft)', maxWidth: 720 }}>
          Spin up a new session, search top categories, and see the instructors
          leading the charge in your neighborhood. Filters update the event feed,
          community hubs, and contributor leaderboard in real time.
        </p>
      </section>

      <section style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <label style={{ display: 'grid', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Search categories</span>
            <input
              type="search"
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Try “AI sessions”, “Boxing”, “Yoga sunrise”..."
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                border: '1px solid rgba(148,163,184,0.32)',
                background: 'rgba(15,23,42,0.65)',
                color: 'inherit',
              }}
            />
          </label>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              style={{
                ...pillStyle,
                background:
                  selectedCategory === 'all'
                    ? 'rgba(56,189,248,0.16)'
                    : 'transparent',
                borderColor:
                  selectedCategory === 'all'
                    ? 'rgba(56,189,248,0.45)'
                    : 'rgba(148,163,184,0.26)',
                cursor: 'pointer',
              }}
            >
              All categories
            </button>
            {visibleCategories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategorySelect(category.id)}
                  style={{
                    ...pillStyle,
                    background: isActive
                      ? 'rgba(236,72,153,0.16)'
                      : 'transparent',
                    borderColor: isActive
                      ? 'rgba(236,72,153,0.45)'
                      : 'rgba(148,163,184,0.26)',
                    cursor: 'pointer',
                  }}
                >
                  {category.label}
                </button>
              );
            })}
            {visibleCategories.length === 0 && (
              <span style={{ color: 'var(--text-soft)' }}>
                No categories match “{categorySearch}” yet.
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <label style={{ display: 'grid', gap: 8, minWidth: 240 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Filter by location</span>
            <select
              value={selectedLocation}
              onChange={(event) => handleLocationSelect(event.target.value)}
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                border: '1px solid rgba(148,163,184,0.32)',
                background: 'rgba(15,23,42,0.65)',
                color: 'inherit',
              }}
            >
              <option value="all">All locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
          </label>
          <div style={{ fontSize: 14, color: 'var(--text-soft)' }}>
            Viewing <strong style={{ color: 'var(--text-strong)' }}>{activeCategoryLabel}</strong>{' '}
            in <strong style={{ color: 'var(--text-strong)' }}>{activeLocationLabel}</strong>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 1fr)',
        }}
      >
        <div style={{ display: 'grid', gap: 20 }}>
          <header style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: 24 }}>Upcoming events</h2>
              <p style={{ margin: 0, color: 'var(--text-soft)' }}>
                Choose a session to reveal the organizers and pricing for that area.
              </p>
            </div>
            <span style={{ alignSelf: 'flex-start', fontSize: 13, opacity: 0.7 }}>
              {filteredEvents.length} events
            </span>
          </header>

          <div
            style={{
              display: 'grid',
              gap: 18,
            }}
          >
            {filteredEvents.map((event) => {
              const eventCategory = categoryMap.get(event.categoryId);
              const eventLocation = locationMap.get(event.locationId);
              const community = communityMap.get(event.communitySlug);
              const hosts = event.hostIds
                .map((id) => leaderMap.get(id)?.name)
                .filter(Boolean)
                .join(', ');
              const fill = percentFilled(event);

              return (
                <article key={event.id} style={{ ...cardStyle, gap: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 16,
                    }}
                  >
                    <div style={{ display: 'grid', gap: 6 }}>
                      <span style={{ fontSize: 13, opacity: 0.7 }}>
                        {event.when} • {event.timeslot}
                      </span>
                      <h3 style={{ margin: 0 }}>{event.title}</h3>
                      <p style={{ margin: 0, color: 'var(--text-soft)' }}>{event.summary}</p>
                    </div>
                    <span style={{ ...pillStyle, border: 'none', background: 'rgba(56,189,248,0.16)' }}>
                      {eventCategory?.label ?? 'Community event'}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 16,
                      fontSize: 14,
                      color: 'var(--text-soft)',
                    }}
                  >
                    <span>
                      {eventLocation?.label ?? 'Location coming soon'} • {event.venue}
                    </span>
                    <span>Format: {event.format}</span>
                    <span>Level: {event.skillLevel}</span>
                    <span>Price: {formatPriceRange(event.price)}</span>
                  </div>

                  <div style={{ display: 'grid', gap: 8 }}>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 999,
                        background: 'rgba(148,163,184,0.22)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${fill}%`,
                          background: 'linear-gradient(90deg, #38bdf8, #f472b6)',
                          height: '100%',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 13,
                        color: 'var(--text-soft)',
                      }}
                    >
                      <span>
                        {event.seats.booked}/{event.seats.total} spots booked ({fill}% full)
                      </span>
                      <span>Organizers: {hosts || 'TBA'}</span>
                    </div>
                  </div>

                  <footer
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <Link
                      href={`/explore/community/${event.communitySlug}`}
                      style={{ ...pillStyle, borderColor: 'rgba(148,163,184,0.4)' }}
                    >
                      Visit {community?.name ?? 'community hub'}
                    </Link>
                    <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                      Hosts compete for top contributor badges here.
                    </span>
                  </footer>
                </article>
              );
            })}
            {filteredEvents.length === 0 && (
              <article style={cardStyle}>
                <h3 style={{ margin: '0 0 8px' }}>No events match yet</h3>
                <p style={{ margin: 0, color: 'var(--text-soft)' }}>
                  Try broadening your filters or clear the search to see all
                  categories and neighborhoods.
                </p>
              </article>
            )}
          </div>
        </div>

        <aside style={{ display: 'grid', gap: 24 }}>
          <section style={{ ...cardStyle, gap: 16 }}>
            <header style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: 13, opacity: 0.75 }}>Top contributors</span>
              <h2 style={{ margin: 0, fontSize: 20 }}>Leaders in {activeLocationLabel}</h2>
              <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: 14 }}>
                Filtered by {activeCategoryLabel.toLowerCase()}. Compare price
                ranges and pick the coach that matches your vibe.
              </p>
            </header>
            <div style={{ display: 'grid', gap: 12 }}>
              {contributorShortlist.map((leader) => (
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
                    Rate: {formatPriceRange(leader.price)} • Rating {leader.rating.toFixed(2)} ★
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                    {leader.expertise[0]}
                  </span>
                </article>
              ))}
              {contributorShortlist.length === 0 && (
                <p style={{ color: 'var(--text-soft)', fontSize: 14 }}>
                  No contributors in view yet—invite instructors to claim this
                  lane.
                </p>
              )}
            </div>
          </section>

          <section style={{ ...cardStyle, gap: 16 }}>
            <header style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: 13, opacity: 0.75 }}>Create an event</span>
              <h2 style={{ margin: 0, fontSize: 20 }}>Draft your session</h2>
              <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: 14 }}>
                Fill out the essentials and share the preview with your
                co-hosts. Everything stays client-side.
              </p>
            </header>
            <form
              onSubmit={handleCreateEvent}
              style={{ display: 'grid', gap: 12 }}
            >
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Title</span>
                <input
                  value={formState.title}
                  onChange={handleFormFieldChange('title')}
                  placeholder="Sunset mobility mashup"
                  required
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.65)',
                    color: 'inherit',
                  }}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Summary</span>
                <textarea
                  value={formState.summary}
                  onChange={handleFormFieldChange('summary')}
                  rows={3}
                  placeholder="What makes this session hype?"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.65)',
                    color: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Category</span>
                <select
                  value={formState.categoryId}
                  onChange={handleFormFieldChange('categoryId')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.65)',
                    color: 'inherit',
                  }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Location</span>
                <select
                  value={formState.locationId}
                  onChange={handleFormFieldChange('locationId')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.65)',
                    color: 'inherit',
                  }}
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </label>
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span>Date</span>
                  <input
                    type="date"
                    value={formState.date}
                    onChange={handleFormFieldChange('date')}
                    required
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(148,163,184,0.28)',
                      background: 'rgba(15,23,42,0.65)',
                      color: 'inherit',
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span>Start time</span>
                  <input
                    type="time"
                    value={formState.start}
                    onChange={handleFormFieldChange('start')}
                    required
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(148,163,184,0.28)',
                      background: 'rgba(15,23,42,0.65)',
                      color: 'inherit',
                    }}
                  />
                </label>
              </div>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Duration (minutes)</span>
                <input
                  type="number"
                  min={15}
                  value={formState.duration}
                  onChange={handleFormFieldChange('duration')}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.65)',
                    color: 'inherit',
                  }}
                />
              </label>
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span>Min price (USD)</span>
                  <input
                    type="number"
                    min={0}
                    value={formState.priceMin}
                    onChange={handleFormFieldChange('priceMin')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(148,163,184,0.28)',
                      background: 'rgba(15,23,42,0.65)',
                      color: 'inherit',
                    }}
                  />
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span>Max price (USD)</span>
                  <input
                    type="number"
                    min={0}
                    value={formState.priceMax}
                    onChange={handleFormFieldChange('priceMax')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(148,163,184,0.28)',
                      background: 'rgba(15,23,42,0.65)',
                      color: 'inherit',
                    }}
                  />
                </label>
              </div>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Venue</span>
                <input
                  value={formState.venue}
                  onChange={handleFormFieldChange('venue')}
                  placeholder="Neighborhood gym, studio, or park"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.28)',
                    background: 'rgba(15,23,42,0.65)',
                    color: 'inherit',
                  }}
                />
              </label>
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span>Format</span>
                  <select
                    value={formState.format}
                    onChange={handleFormFieldChange('format')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(148,163,184,0.28)',
                      background: 'rgba(15,23,42,0.65)',
                      color: 'inherit',
                    }}
                  >
                    <option value="In person">In person</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                </label>
                <label style={{ display: 'grid', gap: 6 }}>
                  <span>Skill level</span>
                  <select
                    value={formState.skillLevel}
                    onChange={handleFormFieldChange('skillLevel')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: '1px solid rgba(148,163,184,0.28)',
                      background: 'rgba(15,23,42,0.65)',
                      color: 'inherit',
                    }}
                  >
                    <option value="All levels">All levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 4 }}
              >
                Generate draft preview
              </button>
            </form>
            {formMessage && (
              <p style={{ fontSize: 13, color: 'var(--text-soft)', margin: 0 }}>
                {formMessage}
              </p>
            )}
            {draftPreview && (
              <article
                style={{
                  border: '1px dashed rgba(148,163,184,0.4)',
                  borderRadius: 16,
                  padding: 16,
                  display: 'grid',
                  gap: 8,
                  background: 'rgba(15,23,42,0.4)',
                }}
              >
                <span style={{ fontSize: 12, opacity: 0.7 }}>Draft preview</span>
                <strong>{draftPreview.title}</strong>
                <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                  {draftPreview.summary}
                </span>
                <span style={{ fontSize: 13 }}>
                  {draftPreview.schedule}
                  {draftPreview.duration ? ` • ${draftPreview.duration}` : ''}
                </span>
                <span style={{ fontSize: 13 }}>
                  {draftPreview.locationLabel}
                  {formState.venue ? ` • ${formState.venue}` : ''}
                </span>
                <span style={{ fontSize: 13 }}>
                  {draftPreview.categoryLabel} • {draftPreview.format} •{' '}
                  {draftPreview.skillLevel}
                </span>
                <span style={{ fontSize: 13 }}>Price: {draftPreview.priceLabel}</span>
              </article>
            )}
          </section>
        </aside>
      </section>

      <section style={{ display: 'grid', gap: 16 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: 24 }}>Communities to collaborate with</h2>
            <p style={{ margin: 0, color: 'var(--text-soft)' }}>
              Discover hubs where instructors are actively competing to host the
              next big thing.
            </p>
          </div>
          <span style={{ fontSize: 13, opacity: 0.7 }}>
            {filteredCommunities.length} hubs
          </span>
        </header>
        <div
          style={{
            display: 'grid',
            gap: 18,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {filteredCommunities.map((community) => {
            const primaryLocation = locationMap.get(community.primaryLocationId);
            const communityCategories = community.categoryIds
              .map((id) => categoryMap.get(id)?.label)
              .filter(Boolean)
              .join(', ');
            return (
              <article key={community.slug} style={cardStyle}>
                <h3 style={{ margin: '0 0 4px' }}>{community.name}</h3>
                <p style={{ margin: 0, color: 'var(--text-soft)' }}>{community.blurb}</p>
                <div style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                  {primaryLocation?.label ?? community.city} • {community.members}{' '}
                  members
                </div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>
                  Focus: {communityCategories || 'Community-led experiments'}
                </div>
                <Link
                  href={`/explore/community/${community.slug}`}
                  style={{ ...pillStyle, borderColor: 'rgba(148,163,184,0.4)' }}
                >
                  View community
                </Link>
              </article>
            );
          })}
          {filteredCommunities.length === 0 && (
            <article style={cardStyle}>
              <h3 style={{ margin: '0 0 8px' }}>No hubs match your filters</h3>
              <p style={{ margin: 0, color: 'var(--text-soft)' }}>
                Adjust category or location to surface active organizers nearby.
              </p>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}

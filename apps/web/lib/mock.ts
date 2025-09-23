export type PriceRange = {
  currency: 'USD';
  min: number;
  max: number;
};

export type Category = {
  id: string;
  label: string;
  tagline: string;
  keywords: string[];
};

export type LocationOption = {
  id: string;
  label: string;
  city: string;
  area: string;
  neighborhoods: string[];
};

export type Leader = {
  id: string;
  name: string;
  area: string;
  score: number;
  badges: string[];
  expertise: string[];
  categories: string[];
  locations: string[];
  price: PriceRange;
  rating: number;
  sessionsHosted: number;
  bio: string;
};

export type Community = {
  slug: string;
  name: string;
  city: string;
  members: number;
  blurb: string;
  categoryIds: string[];
  primaryLocationId: string;
};

export type Event = {
  id: string;
  title: string;
  summary: string;
  categoryId: string;
  when: string;
  timeslot: string;
  locationId: string;
  venue: string;
  communitySlug: string;
  hostIds: string[];
  price: PriceRange;
  seats: {
    total: number;
    booked: number;
  };
  format: 'In person' | 'Hybrid' | 'Virtual';
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels';
};

export const categories: Category[] = [
  {
    id: 'tech',
    label: 'Tech Build Nights',
    tagline: 'Prototype apps, automate workflows, and ship fast with local mentors.',
    keywords: ['code', 'build', 'hackathon', 'startup'],
  },
  {
    id: 'ai',
    label: 'AI & Data Sessions',
    tagline: 'Hands-on labs for machine learning, prompt craft, and applied AI.',
    keywords: ['machine learning', 'prompt', 'llm', 'data'],
  },
  {
    id: 'fitness',
    label: 'Functional Fitness',
    tagline: 'Strength circuits, conditioning ladders, and community gym meetups.',
    keywords: ['gym', 'strength', 'conditioning', 'community'],
  },
  {
    id: 'yoga',
    label: 'Yoga & Mindfulness',
    tagline: 'Breathwork, flow classes, and restorative sessions under the sun.',
    keywords: ['yoga', 'mindfulness', 'breathwork', 'mobility'],
  },
  {
    id: 'boxing',
    label: 'Boxing & Combat Arts',
    tagline: 'Technique clinics, pad work, and sparring strategy for all levels.',
    keywords: ['boxing', 'sparring', 'combat', 'footwork'],
  },
];

export const locations: LocationOption[] = [
  {
    id: 'south-bay',
    label: 'South Bay • Sunnyvale, CA',
    city: 'Sunnyvale',
    area: 'South Bay',
    neighborhoods: ['Downtown', 'Murphy Station', 'Heritage District'],
  },
  {
    id: 'peninsula',
    label: 'Peninsula • Mountain View, CA',
    city: 'Mountain View',
    area: 'Peninsula',
    neighborhoods: ['Castro Street', 'Shoreline', 'North Bayshore'],
  },
  {
    id: 'east-bay',
    label: 'East Bay • Fremont, CA',
    city: 'Fremont',
    area: 'East Bay',
    neighborhoods: ['Centerville', 'Warm Springs', 'Mission San Jose'],
  },
  {
    id: 'san-francisco',
    label: 'San Francisco, CA',
    city: 'San Francisco',
    area: 'City',
    neighborhoods: ['SOMA', 'Mission', 'Sunset'],
  },
];

export const leaders: Leader[] = [
  {
    id: 'leader-asha',
    name: 'Asha Menon',
    area: 'Sunnyvale Downtown',
    score: 912,
    badges: ['Trailblazer', 'Host+', 'Helped 25'],
    expertise: ['AI product strategy', 'No-code automation', 'Community prototyping'],
    categories: ['tech', 'ai'],
    locations: ['south-bay', 'peninsula'],
    price: { currency: 'USD', min: 75, max: 120 },
    rating: 4.9,
    sessionsHosted: 42,
    bio: 'Stanford design fellow turned AI coach helping teams go from ideas to working pilots in 48 hours.',
  },
  {
    id: 'leader-marco',
    name: 'Marco Liu',
    area: 'Santa Clara',
    score: 860,
    badges: ['Connector', 'Host', 'Helped 10'],
    expertise: ['Strength programming', 'Mobility coaching', 'Metcon design'],
    categories: ['fitness', 'boxing'],
    locations: ['south-bay', 'east-bay'],
    price: { currency: 'USD', min: 45, max: 80 },
    rating: 4.7,
    sessionsHosted: 58,
    bio: 'Former D1 strength coach bringing competition-style conditioning to neighborhood gyms.',
  },
  {
    id: 'leader-riya',
    name: 'Riya Shah',
    area: 'Cupertino',
    score: 788,
    badges: ['Guide', 'Host', 'Safety Steward'],
    expertise: ['Restorative flow', 'Mindfulness facilitation', 'Somatic release'],
    categories: ['yoga'],
    locations: ['peninsula', 'south-bay'],
    price: { currency: 'USD', min: 35, max: 65 },
    rating: 4.95,
    sessionsHosted: 73,
    bio: 'Trauma-informed yoga teacher blending flow, sound baths, and nervous system resets.',
  },
  {
    id: 'leader-jordan',
    name: 'Jordan Brooks',
    area: 'San Jose',
    score: 744,
    badges: ['Corner Coach', 'Host', 'Pad Master'],
    expertise: ['Footwork labs', 'Pad work', 'Fight camp planning'],
    categories: ['boxing', 'fitness'],
    locations: ['south-bay', 'east-bay'],
    price: { currency: 'USD', min: 55, max: 95 },
    rating: 4.8,
    sessionsHosted: 39,
    bio: 'Golden Gloves semifinalist mentoring new fighters on ring IQ and conditioning.',
  },
  {
    id: 'leader-sofia',
    name: 'Sofia Delgado',
    area: 'San Francisco',
    score: 702,
    badges: ['Systems Thinker', 'Host', 'Community Ops'],
    expertise: ['Data storytelling', 'Prompt design', 'Ops automation'],
    categories: ['ai', 'tech'],
    locations: ['san-francisco', 'peninsula'],
    price: { currency: 'USD', min: 60, max: 105 },
    rating: 4.85,
    sessionsHosted: 51,
    bio: 'Data scientist and facilitator translating AI concepts into friendly neighborhood labs.',
  },
];

export const communities: Community[] = [
  {
    slug: 'ai-builders',
    name: 'AI Builders Collective',
    city: 'Sunnyvale',
    members: 842,
    blurb: 'Weekend hands-on sessions—ship small, ship fast with neighbors who love to tinker.',
    categoryIds: ['tech', 'ai'],
    primaryLocationId: 'south-bay',
  },
  {
    slug: 'functional-fitness',
    name: 'Functional Fitness Circuit',
    city: 'Santa Clara',
    members: 430,
    blurb: 'Casual-but-competitive squads stacking strength, mobility, and stamina blocks.',
    categoryIds: ['fitness', 'boxing'],
    primaryLocationId: 'south-bay',
  },
  {
    slug: 'sunrise-flow',
    name: 'Sunrise Flow Collective',
    city: 'Mountain View',
    members: 295,
    blurb: 'Music, movement, and mindful resets—no pretzel poses required.',
    categoryIds: ['yoga'],
    primaryLocationId: 'peninsula',
  },
  {
    slug: 'downtown-boxing',
    name: 'Downtown Boxing Crew',
    city: 'San Jose',
    members: 188,
    blurb: 'Pad parties, sparring labs, and corner talks with fighters across the valley.',
    categoryIds: ['boxing', 'fitness'],
    primaryLocationId: 'south-bay',
  },
];

export const events: Event[] = [
  {
    id: 'event-ai-weekend',
    title: 'AI Sprint Weekend',
    summary: 'Prototype an MVP with community mentors and live feedback checkpoints.',
    categoryId: 'ai',
    when: 'Sat, Jun 22',
    timeslot: '10:00 AM – 4:00 PM PT',
    locationId: 'south-bay',
    venue: 'Sunnyvale Maker Hub',
    communitySlug: 'ai-builders',
    hostIds: ['leader-asha', 'leader-sofia'],
    price: { currency: 'USD', min: 79, max: 129 },
    seats: { total: 36, booked: 28 },
    format: 'Hybrid',
    skillLevel: 'Intermediate',
  },
  {
    id: 'event-ai-prototype-lab',
    title: 'Rapid Prototyping Lab',
    summary: 'Pair-build automations using community data sets and ready-to-use prompts.',
    categoryId: 'tech',
    when: 'Thu, Jun 27',
    timeslot: '6:00 PM – 8:30 PM PT',
    locationId: 'san-francisco',
    venue: 'SoMa Foundry',
    communitySlug: 'ai-builders',
    hostIds: ['leader-sofia'],
    price: { currency: 'USD', min: 65, max: 95 },
    seats: { total: 24, booked: 19 },
    format: 'In person',
    skillLevel: 'All levels',
  },
  {
    id: 'event-strength-gauntlet',
    title: 'Strength Gauntlet Challenge',
    summary: 'Team-based functional fitness ladder with real-time leaderboard tracking.',
    categoryId: 'fitness',
    when: 'Sun, Jun 23',
    timeslot: '9:00 AM – 11:00 AM PT',
    locationId: 'south-bay',
    venue: 'Reed & Grant Sports Park',
    communitySlug: 'functional-fitness',
    hostIds: ['leader-marco'],
    price: { currency: 'USD', min: 40, max: 70 },
    seats: { total: 30, booked: 24 },
    format: 'In person',
    skillLevel: 'All levels',
  },
  {
    id: 'event-sunrise-flow',
    title: 'Sunrise Flow & Sound Bath',
    summary: '60-minute flow ending with a sound bath and guided journaling on the lawn.',
    categoryId: 'yoga',
    when: 'Wed, Jun 26',
    timeslot: '7:30 AM – 8:45 AM PT',
    locationId: 'peninsula',
    venue: 'Shoreline Park Meadow',
    communitySlug: 'sunrise-flow',
    hostIds: ['leader-riya'],
    price: { currency: 'USD', min: 28, max: 48 },
    seats: { total: 40, booked: 34 },
    format: 'In person',
    skillLevel: 'All levels',
  },
  {
    id: 'event-evening-restorative',
    title: 'Evening Restorative Reset',
    summary: 'Gentle mobility, restorative poses, and breathwork for laptop-heavy weeks.',
    categoryId: 'yoga',
    when: 'Fri, Jun 28',
    timeslot: '6:30 PM – 7:45 PM PT',
    locationId: 'south-bay',
    venue: 'Downtown Loft Studio',
    communitySlug: 'sunrise-flow',
    hostIds: ['leader-riya'],
    price: { currency: 'USD', min: 32, max: 52 },
    seats: { total: 26, booked: 18 },
    format: 'Hybrid',
    skillLevel: 'Beginner',
  },
  {
    id: 'event-boxing-foundations',
    title: 'Boxing Foundations Lab',
    summary: 'Footwork, pad work, and timing drills with live sparring strategy breakdowns.',
    categoryId: 'boxing',
    when: 'Sat, Jun 29',
    timeslot: '4:30 PM – 6:00 PM PT',
    locationId: 'east-bay',
    venue: 'Mission San Jose Boxing Gym',
    communitySlug: 'downtown-boxing',
    hostIds: ['leader-jordan'],
    price: { currency: 'USD', min: 55, max: 90 },
    seats: { total: 20, booked: 15 },
    format: 'In person',
    skillLevel: 'Beginner',
  },
  {
    id: 'event-fight-night-prep',
    title: 'Fight Night Prep Camp',
    summary: 'Conditioning sprints, sparring rotations, and corner strategy reviews.',
    categoryId: 'boxing',
    when: 'Tue, Jul 2',
    timeslot: '7:00 PM – 9:00 PM PT',
    locationId: 'south-bay',
    venue: 'San Jose Civic Training Hall',
    communitySlug: 'downtown-boxing',
    hostIds: ['leader-jordan', 'leader-marco'],
    price: { currency: 'USD', min: 60, max: 110 },
    seats: { total: 32, booked: 20 },
    format: 'In person',
    skillLevel: 'Intermediate',
  },
];

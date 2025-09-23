export type Leader = { id: string; name: string; area: string; score: number; badges: string[] };
export type Community = { slug: string; name: string; city: string; members: number; blurb: string };
export type Event = { id: string; title: string; when: string; where: string; hostId: string; communitySlug: string };

export const leaders: Leader[] = [
  { id:'l-1', name:'Asha Menon', area:'Sunnyvale Downtown', score: 912, badges:['Trailblazer','Host+','Helped 25'] },
  { id:'l-2', name:'Marco Liu', area:'Santa Clara',        score: 860, badges:['Connector','Host','Helped 10'] },
  { id:'l-3', name:'Riya Shah',  area:'Cupertino',         score: 788, badges:['Guide','Host','Safety Steward'] },
];

export const communities: Community[] = [
  { slug:'ai-builders', name:'AI Builders', city:'Sunnyvale', members: 842, blurb:'Weekend hands-on sessions—ship small, ship fast.' },
  { slug:'football-sun', name:'Sunday Football', city:'Santa Clara', members: 430, blurb:'Casual 7-a-side every weekend.' },
  { slug:'open-mics', name:'Open Mics', city:'Cupertino', members: 295, blurb:'Music, poetry, stories—no online clout required.' },
];

export const events: Event[] = [
  { id:'e-101', title:'Hack a weekend MVP', when:'Sat 4pm', where:'Sunnyvale Library', hostId:'l-1', communitySlug:'ai-builders' },
  { id:'e-102', title:'Pick-up football',   when:'Sun 8am', where:'Reed & Grant SC',   hostId:'l-2', communitySlug:'football-sun' },
  { id:'e-103', title:'Acoustic night',     when:'Fri 7pm', where:'Main Street Park',  hostId:'l-3', communitySlug:'open-mics' },
];

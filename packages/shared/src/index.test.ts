import { describe, expect, it } from 'vitest';
import { CreateEventSchema } from './index';

describe('CreateEventSchema', () => {
  it('parses valid payload', () => {
    const payload = {
      title: 'Chess meetup',
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 3600000).toISOString(),
      communityId: 'community-1',
      coordinates: { lat: 28.6, lon: 77.2 },
    };

    const parsed = CreateEventSchema.parse(payload);
    expect(parsed.title).toBe('Chess meetup');
  });

  it('rejects invalid coordinates', () => {
    expect(() =>
      CreateEventSchema.parse({
        title: 'Invalid',
        startAt: new Date().toISOString(),
        endAt: new Date().toISOString(),
        communityId: 'community-1',
        coordinates: { lat: 120, lon: 77.2 },
      }),
    ).toThrow();
  });
});

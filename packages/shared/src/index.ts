import { z } from 'zod';

export const CoordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
});

export const CreateEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  communityId: z.string(),
  venueName: z.string().optional(),
  coordinates: CoordinatesSchema,
  maxAttendees: z.number().int().positive().optional(),
});

export type CreateEventInput = z.infer<typeof CreateEventSchema>;

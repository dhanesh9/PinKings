import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  getNearbyEvents(lat?: string, lon?: string) {
    return [
      {
        id: 'event-1',
        title: 'Chess in the Park',
        lat: lat ? Number(lat) : 0,
        lon: lon ? Number(lon) : 0,
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 3600000).toISOString(),
      },
    ];
  }

  getEvent(id: string) {
    return {
      id,
      title: 'Placeholder Event',
      description: 'Event details will be implemented via Prisma.',
    };
  }

  createEvent(payload: unknown) {
    void payload;
    return {
      id: 'event-created',
      status: 'pending-implementation',
    };
  }
}

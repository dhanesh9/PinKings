import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadersService {
  listTop(pin?: string, interest?: string) {
    return [
      {
        id: 'leader-1',
        name: 'Sample Pin King',
        pinCode: pin ?? '000000',
        interest: interest ?? 'general',
        badgeTier: 'BRONZE',
      },
    ];
  }

  apply(payload: unknown) {
    void payload;
    return { status: 'received', nextSteps: 'ID verification pending' };
  }

  getLeader(id: string) {
    return {
      id,
      name: 'Sample Leader',
      stats: { eventsHosted: 0, points: 0 },
    };
  }
}

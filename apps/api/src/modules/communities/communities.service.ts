import { Injectable } from '@nestjs/common';

interface CommunityFilter {
  pin?: string;
  interest?: string;
}

@Injectable()
export class CommunitiesService {
  findCommunities(filter: CommunityFilter) {
    return [
      {
        id: 'community-1',
        title: 'Sample Community',
        interestSlug: filter.interest ?? 'general',
        pinCode: filter.pin ?? '000000',
        description: 'Placeholder community data.',
      },
    ];
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class InterestsService {
  private readonly seeds = [
    { id: 'chess', name: 'Chess' },
    { id: 'football', name: 'Football' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'photography', name: 'Photography' },
  ];

  list() {
    return this.seeds;
  }
}

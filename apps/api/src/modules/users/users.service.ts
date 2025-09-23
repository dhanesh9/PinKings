import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserProfile(id: string) {
    return {
      id,
      name: 'Placeholder User',
      points: 0,
      roles: ['MEMBER'],
    };
  }
}

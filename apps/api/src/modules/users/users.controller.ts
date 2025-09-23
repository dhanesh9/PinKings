import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a user profile placeholder.' })
  getUser(@Param('id') id: string) {
    return this.usersService.getUserProfile(id);
  }
}

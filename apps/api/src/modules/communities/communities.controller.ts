import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommunitiesService } from './communities.service';

@ApiTags('communities')
@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  @ApiQuery({ name: 'pin', required: false })
  @ApiQuery({ name: 'interest', required: false })
  @ApiOkResponse({ description: 'List communities filtered by pin and interest.' })
  findCommunities(@Query('pin') pin?: string, @Query('interest') interest?: string) {
    return this.communitiesService.findCommunities({ pin, interest });
  }
}

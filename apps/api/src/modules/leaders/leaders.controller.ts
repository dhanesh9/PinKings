import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LeadersService } from './leaders.service';

@ApiTags('leaders')
@Controller('leaders')
export class LeadersController {
  constructor(private readonly leadersService: LeadersService) {}

  @Get('top')
  @ApiOperation({ summary: 'List top leaders by pin and interest.' })
  @ApiOkResponse({ description: 'Returns placeholder leader rankings.' })
  listTop(@Query('pin') pin?: string, @Query('interest') interest?: string) {
    return this.leadersService.listTop(pin, interest);
  }

  @Post('apply')
  @ApiOperation({ summary: 'Apply for leader badge (placeholder).' })
  apply(@Body() payload: unknown) {
    return this.leadersService.apply(payload);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get leader profile placeholder.' })
  detail(@Param('id') id: string) {
    return this.leadersService.getLeader(id);
  }
}

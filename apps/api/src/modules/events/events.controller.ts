import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('near')
  @ApiOkResponse({ description: 'List nearby events using a placeholder dataset.' })
  findNearby(@Query('lat') lat?: string, @Query('lon') lon?: string) {
    return this.eventsService.getNearbyEvents(lat, lon);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get event details placeholder.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.getEvent(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create an event placeholder.' })
  create(@Body() body: unknown) {
    return this.eventsService.createEvent(body);
  }
}

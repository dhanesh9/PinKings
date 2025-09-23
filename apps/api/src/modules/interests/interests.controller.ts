import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InterestsService } from './interests.service';

@ApiTags('interests')
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get()
  @ApiOkResponse({ description: 'Return seeded interest categories placeholder.' })
  list() {
    return this.interestsService.list();
  }
}

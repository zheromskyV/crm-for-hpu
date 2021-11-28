import { Controller, Get } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { SkipAuth } from '../auth/skip-auth.decorator';
import { StatusesService } from './statuses/statuses.service';
import { TypesService } from './types/types.service';
import { GetStatusesConfigDto } from './statuses/statuses.dto';
import { GetTypesConfigDto } from './types/types.dto';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly statusesService: StatusesService,
    private readonly typesService: TypesService
  ) {}

  @SkipAuth()
  @Get()
  async getAll(): Promise<any> {
    return this.requestsService.getAll();
  }

  @SkipAuth()
  @Get('statuses')
  async getStatusesConfig(): Promise<GetStatusesConfigDto> {
    return this.statusesService.getConfig();
  }

  @SkipAuth()
  @Get('types')
  async getTypesConfig(): Promise<GetTypesConfigDto> {
    return this.typesService.getConfig();
  }
}

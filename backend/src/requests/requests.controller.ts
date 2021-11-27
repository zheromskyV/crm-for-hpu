import { Controller, Get } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { SkipAuth } from '../auth/skip-auth.decorator';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @SkipAuth()
  @Get()
  async getAll(): Promise<any> {
    return this.requestsService.getAll();
  }
}

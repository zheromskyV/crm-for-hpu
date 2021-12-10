import { Controller, Get } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { GetPhoneDto } from './phones.dto';
import { Phone } from './phone.entity';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get()
  async getAll(): Promise<GetPhoneDto[]> {
    const phones: Phone[] = await this.phonesService.getAll();

    return phones.map(this.phonesService.mapToSend.bind(this.phonesService));
  }
}

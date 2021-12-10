import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { Repository } from 'typeorm';
import { GetPhoneDto } from './phones.dto';

@Injectable()
export class PhonesService {
  constructor(@InjectRepository(Phone) private readonly phoneRepo: Repository<Phone>) {}

  async getAll(): Promise<Phone[]> {
    return this.phoneRepo.find();
  }

  mapToSend(phone: Phone): GetPhoneDto {
    return phone;
  }
}

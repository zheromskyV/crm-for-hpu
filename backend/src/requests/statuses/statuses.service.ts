import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../../core/config/config.service';
import { isEmpty } from 'lodash';
import { ConfigServiceUser } from '../../core/config/config.interface';
import { Status } from './status.entity';
import { GetStatusesConfigDto } from './statuses.dto';

@Injectable()
export class StatusesService implements ConfigServiceUser {
  private statuses: Status[] = [];

  constructor(
    @InjectRepository(Status) private readonly statusRepo: Repository<Status>,
    private readonly configService: ConfigService
  ) {}

  async getConfig(): Promise<GetStatusesConfigDto> {
    await this.sync();

    return {
      statuses: this.configService.map(this.statuses),
    };
  }

  async getById(statusId: string): Promise<Status> {
    await this.sync();

    return this.statuses.find(({ id }: Status) => id === statusId);
  }

  async sync(): Promise<void> {
    if (isEmpty(this.statuses)) {
      this.statuses = await this.statusRepo.find();
    }
  }
}

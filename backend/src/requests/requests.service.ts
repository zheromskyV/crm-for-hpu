import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';

@Injectable()
export class RequestsService {
  private readonly relations = ['type', 'status', 'createdBy', 'assignedTo', 'feeds', 'feeds.createdBy'];

  constructor(@InjectRepository(Request) private readonly requestRepo: Repository<Request>) {}

  async getAll(): Promise<Request[]> {
    return this.requestRepo.find({ relations: this.relations });
  }
}

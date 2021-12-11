import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';
import { CreateRequestDto, GetRequestDto, UpdateRequestDto } from './request.dto';
import { isNil, omit, omitBy } from 'lodash';
import { UsersService } from '../users/users.service';
import { FeedsService } from './feeds/feeds.service';
import { Status } from './statuses/status.entity';
import { StatusesService } from './statuses/statuses.service';
import { Type } from './types/type.entity';
import { TypesService } from './types/types.service';
import { User } from '../users/user.entity';
import { Feed } from './feeds/feed.entity';

@Injectable()
export class RequestsService {
  private readonly relations = [
    'type',
    'status',
    'createdBy',
    'createdBy.role',
    'createdBy.profile',
    'assignedTo',
    'assignedTo.role',
    'feeds',
    'feeds.createdBy',
    'feeds.createdBy.role',
  ];

  constructor(
    @InjectRepository(Request) private readonly requestRepo: Repository<Request>,
    private readonly usersService: UsersService,
    private readonly feedsService: FeedsService,
    private readonly statusesService: StatusesService,
    private readonly typesService: TypesService
  ) {}

  async getAll(): Promise<Request[]> {
    return this.requestRepo.find({ relations: this.relations });
  }

  async getForUser(user: User): Promise<Request[]> {
    return this.requestRepo.find({
      relations: this.relations,
      where: [{ createdBy: user }, { assignedTo: user }],
    });
  }

  async create(requestDto: CreateRequestDto, createdBy: User): Promise<Request> {
    const status: Status = await this.statusesService.getById(requestDto.statusId);
    const type: Type = await this.typesService.getById(requestDto.typeId);

    return this.requestRepo.save({
      ...requestDto,
      status,
      type,
      createdBy,
    });
  }

  async update(requestDto: UpdateRequestDto): Promise<Request> {
    const status: Status = await this.statusesService.getById(requestDto.statusId);
    const type: Type = await this.typesService.getById(requestDto.typeId);

    let assignedTo: User | null = null;

    if (requestDto.assignedToId) {
      assignedTo = await this.usersService.getById(requestDto.assignedToId);
    }

    await this.requestRepo.save(
      omitBy(
        {
          ...requestDto,
          status,
          type,
          assignedTo,
        },
        isNil
      )
    );

    return this.requestRepo.findOneOrFail(requestDto.id, { relations: this.relations });
  }

  async delete(id: string): Promise<void> {
    await this.requestRepo.delete(id);
  }

  async addFeed(feed: Feed, requestId: string): Promise<Request> {
    const request: Request = await this.requestRepo.findOneOrFail({ id: requestId }, { relations: this.relations });

    request.feeds.push(feed);

    return this.requestRepo.save({ ...request });
  }

  mapToSend(request: Request): GetRequestDto {
    return {
      ...omit(request, ['status', 'type', 'createdBy', 'assignedTo', 'feeds']),
      statusId: request.status.id,
      typeId: request.type.id,
      createdBy: request.createdBy ? this.usersService.mapToSend(request.createdBy) : undefined,
      assignedTo: request.assignedTo ? this.usersService.mapToSend(request.assignedTo) : undefined,
      feeds: (request.feeds || []).map(this.feedsService.mapToSend.bind(this.feedsService)),
    };
  }
}

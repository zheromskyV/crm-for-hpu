import { Injectable } from '@nestjs/common';
import { Feed } from './feed.entity';
import { CreateFeedDto, GetFeedDto } from './feeds.dto';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed) private readonly feedRepo: Repository<Feed>,
    private readonly usersService: UsersService
  ) {}

  async create({ message }: CreateFeedDto, createdBy: User): Promise<Feed> {
    return this.feedRepo.save({ message, createdBy });
  }

  mapToSend({ id, message, createdAt, createdBy }: Feed): GetFeedDto {
    return {
      id,
      message,
      createdAt,
      createdBy: this.usersService.mapToSend(createdBy),
    };
  }
}

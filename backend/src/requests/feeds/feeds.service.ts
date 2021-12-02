import { Injectable } from '@nestjs/common';
import { Feed } from './feed.entity';
import { GetFeedDto } from './feeds.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class FeedsService {
  constructor(private readonly usersService: UsersService) {}

  mapToSend({ id, message, createdAt, createdBy }: Feed): GetFeedDto {
    return {
      id,
      message,
      createdAt,
      createdBy: this.usersService.mapToSend(createdBy),
    };
  }
}

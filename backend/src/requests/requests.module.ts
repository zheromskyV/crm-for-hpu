import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { TypesService } from './types/types.service';
import { StatusesService } from './statuses/statuses.service';
import { StatusesController } from './statuses/statuses.controller';
import { TypesController } from './types/types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { Type } from './types/type.entity';
import { Status } from './statuses/status.entity';
import { FeedsService } from './feeds/feeds.service';
import { Feed } from './feeds/feed.entity';
import { CoreModule } from '../core/core.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [RequestsController, StatusesController, TypesController],
  providers: [RequestsService, TypesService, StatusesService, FeedsService],
  imports: [TypeOrmModule.forFeature([Request, Type, Status, Feed]), CoreModule, UsersModule],
})
export class RequestsModule {}

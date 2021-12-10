import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { SkipAuth } from '../auth/skip-auth.decorator';
import { StatusesService } from './statuses/statuses.service';
import { TypesService } from './types/types.service';
import { GetStatusesConfigDto } from './statuses/statuses.dto';
import { GetTypesConfigDto } from './types/types.dto';
import { Request } from './request.entity';
import { CreateRequestDto, GetRequestDto } from './request.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateFeedDto, GetFeedDto } from './feeds/feeds.dto';
import { Feed } from './feeds/feed.entity';
import { FeedsService } from './feeds/feeds.service';

@Controller('requests')
export class RequestsController {
  constructor(
    private readonly requestsService: RequestsService,
    private readonly statusesService: StatusesService,
    private readonly typesService: TypesService,
    private readonly usersService: UsersService,
    private readonly feedsService: FeedsService
  ) {}

  @Get()
  async getAll(): Promise<GetRequestDto[]> {
    const requests: Request[] = await this.requestsService.getAll();

    return requests.map(this.requestsService.mapToSend.bind(this.requestsService));
  }

  @Get('mine')
  async getMine(@Req() req): Promise<GetRequestDto[]> {
    const user: User = await this.usersService.getById(req.user?.id || '');
    const requests: Request[] = await this.requestsService.getForUser(user);

    return requests.map(this.requestsService.mapToSend.bind(this.requestsService));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() requestDto: CreateRequestDto, @Req() req): Promise<GetRequestDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');
    const request: Request = await this.requestsService.create(requestDto, user);

    return this.requestsService.mapToSend(request);
  }

  @Post('feeds')
  @HttpCode(HttpStatus.CREATED)
  async addFeed(@Body() feedDto: CreateFeedDto, @Req() req): Promise<GetFeedDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');
    const feed: Feed = await this.feedsService.create(feedDto, user);

    await this.requestsService.addFeed(feed, feedDto.requestId);

    return this.feedsService.mapToSend(feed);
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

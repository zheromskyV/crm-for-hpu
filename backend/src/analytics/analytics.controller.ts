import { Controller, Get, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsDto } from './analytics.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService, private readonly usersService: UsersService) {}

  @Get('requestTypesForUser')
  async getRequestTypesAnalyticsForUser(@Req() req): Promise<GetAnalyticsDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    return this.analyticsService.getRequestTypesAnalyticsForUser(user);
  }

  @Get('requestTypesForAdmin')
  async getRequestTypesAnalyticsForAdmin(): Promise<GetAnalyticsDto> {
    return this.analyticsService.getRequestTypesAnalyticsForAdmin();
  }

  @Get('requestStatusesForUser')
  async getRequestStatusesAnalyticsForUser(@Req() req): Promise<GetAnalyticsDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    return this.analyticsService.getRequestStatusesAnalyticsForUser(user);
  }

  @Get('requestStatusesForAdmin')
  async getRequestStatusesAnalyticsForAdmin(): Promise<GetAnalyticsDto> {
    return this.analyticsService.getRequestStatusesAnalyticsForAdmin();
  }

  @Get('requestsByDayForUser')
  async getRequestAnalyticsByDayForUser(@Req() req): Promise<GetAnalyticsDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    return this.analyticsService.getRequestAnalyticsByDayForUser(user);
  }

  @Get('requestsByDayForAdmin')
  async getRequestAnalyticsByDayForAdmin(): Promise<GetAnalyticsDto> {
    return this.analyticsService.getRequestAnalyticsByDayForAdmin();
  }

  @Get('feedback')
  async getFeedbackAnalytics(): Promise<GetAnalyticsDto> {
    return this.analyticsService.getFeedbackAnalytics();
  }

  @Get('assignee')
  async getRequestsAssigneeAnalytics(): Promise<GetAnalyticsDto> {
    return this.analyticsService.getRequestsAssigneeAnalytics();
  }
}

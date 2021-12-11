import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { UsersModule } from '../users/users.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [UsersModule, RequestsModule],
})
export class AnalyticsModule {}

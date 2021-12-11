import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './app.constants';
import { RequestsModule } from './requests/requests.module';
import { ArticlesModule } from './articles/articles.module';
import { EmailModule } from './email/email.module';
import { PhonesModule } from './phones/phones.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    RequestsModule,
    ArticlesModule,
    EmailModule,
    PhonesModule,
    AnalyticsModule,
  ],
})
export class AppModule {}

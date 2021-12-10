import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [UsersModule],
})
export class EmailModule {}

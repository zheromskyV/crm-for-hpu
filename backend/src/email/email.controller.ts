import { Body, Controller, Post, Req } from '@nestjs/common';
import { EmailService } from './email.service';
import { NotifyAgentEmailDto, RequestCallEmailDto } from './email.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService, private readonly usersService: UsersService) {}

  @Post('requestCall')
  async requestCall(@Body() { phoneNumber }: RequestCallEmailDto, @Req() req): Promise<void> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    await this.emailService.requestCall(phoneNumber, user.email);
  }

  @Post('notifyAgent')
  async notifyAgent(@Body() { agentEmail, requestSubject }: NotifyAgentEmailDto, @Req() req): Promise<void> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    await this.emailService.notifyAgent(agentEmail, requestSubject, user.email);
  }
}

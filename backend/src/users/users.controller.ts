import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, GetUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    const users: User[] = await this.usersService.getAll();

    return users.map(this.usersService.mapToSend.bind(this.usersService));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    const user: User = await this.usersService.create(userDto);

    return this.usersService.mapToSend(user);
  }
}

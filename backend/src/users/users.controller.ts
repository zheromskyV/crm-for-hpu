import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, GetUserDto } from './users.dto';
import { UsersService } from './users.service';
import { GetProfileDto, UpdateProfileDto } from './profiles/profiles.dto';
import { Profile } from './profiles/profile.entity';
import { ProfilesService } from './profiles/profiles.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly profilesService: ProfilesService) {}

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    const users: User[] = await this.usersService.getAll();

    return users.map(this.usersService.mapToSend.bind(this.usersService));
  }

  @Get('me')
  async getMe(@Req() req): Promise<GetUserDto> {
    const user: User = await this.usersService.getById(req.user?.id || '');

    return this.usersService.mapToSend(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    const user: User = await this.usersService.create(userDto);

    return this.usersService.mapToSend(user);
  }

  @Put('profile')
  async updateProfile(@Body() profileDto: UpdateProfileDto): Promise<GetProfileDto> {
    const profile: Profile = await this.profilesService.update(profileDto);

    return this.profilesService.mapToSend(profile);
  }
}

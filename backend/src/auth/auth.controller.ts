import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, TokenDto } from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import { AuthService } from './auth.service';
import { SkipAuth } from './skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<TokenDto> {
    return this.authService.login(loginUserDto);
  }

  @SkipAuth()
  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<TokenDto> {
    return this.authService.register(userDto);
  }
}

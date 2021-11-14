import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { LoginUserDto, TokenDto } from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import { HashService } from '../users/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService
  ) {}

  async register(userDto: CreateUserDto) {
    const user: User = await this.usersService.create(userDto);

    return this.signToken(user);
  }

  async login(loginDto: LoginUserDto) {
    const user: User = await this.validateUser(loginDto);

    return this.signToken(user);
  }

  private async validateUser(loginDto: LoginUserDto): Promise<User> {
    const user: User = await this.usersService.getByEmail(loginDto.email);

    const isValidPassword = await this.hashService.compare(loginDto.password, user.password);

    if (user && isValidPassword) {
      return user;
    }

    throw new UnauthorizedException('bad email or password');
  }

  private signToken({ id }: User): TokenDto {
    return {
      token: this.jwtService.sign({ id }),
    };
  }
}

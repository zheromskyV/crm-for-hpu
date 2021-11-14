import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './users.dto';
import { RolesService } from './roles/roles.service';
import { Role } from './roles/role.entity';
import { ProfilesService } from './profiles/profiles.service';
import { Profile } from './profiles/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly profilesService: ProfilesService
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['profile', 'role'] });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const role: Role = await this.rolesService.getById(userDto.roleId);
    const profile: Profile = userDto.profile && (await this.profilesService.create(userDto.profile));

    return this.userRepo.save({ ...userDto, role, profile });
  }

  public mapToSend({ id, email, role, profile }: User): GetUserDto {
    return {
      id,
      email,
      roleId: role.id,
      ...(profile && {
        profile: this.profilesService.mapToSend(profile),
      }),
    };
  }
}

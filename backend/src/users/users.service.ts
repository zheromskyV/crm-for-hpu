import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './users.dto';
import { RolesService } from './roles/roles.service';
import { Role } from './roles/role.entity';
import { ProfilesService } from './profiles/profiles.service';
import { Profile } from './profiles/profile.entity';
import { HashService } from './hash/hash.service';

@Injectable()
export class UsersService {
  private readonly relations = ['profile', 'role'];

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly profilesService: ProfilesService,
    private readonly hashService: HashService
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepo.find({ relations: this.relations });
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      relations: this.relations,
      where: { email },
    });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const role: Role = await this.rolesService.getById(userDto.roleId);
      const profile: Profile = userDto.profile && (await this.profilesService.create(userDto.profile));

      const hashedPassword = await this.hashService.hash(userDto.password);

      return await this.userRepo.save({
        ...userDto,
        role,
        profile,
        password: hashedPassword,
      });
    } catch (error) {
      throw new BadRequestException('email already exists');
    }
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

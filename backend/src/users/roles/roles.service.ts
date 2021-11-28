import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { GetRolesConfigDto } from './roles.dto';
import { isEmpty } from 'lodash';
import { ConfigService } from '../../core/config/config.service';
import { ConfigServiceUser } from '../../core/config/config.interface';

@Injectable()
export class RolesService implements ConfigServiceUser {
  private roles: Role[] = [];

  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly configService: ConfigService
  ) {}

  async getConfig(): Promise<GetRolesConfigDto> {
    await this.sync();

    return {
      roles: this.configService.map(this.roles),
    };
  }

  async getById(roleId: string): Promise<Role> {
    await this.sync();

    return this.roles.find(({ id }: Role) => id === roleId);
  }

  async sync(): Promise<void> {
    if (isEmpty(this.roles)) {
      this.roles = await this.roleRepo.find();
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { GetRolesConfigDto } from './roles.dto';
import { isEmpty } from 'lodash';
import { ConfigService } from '../../core/config/config.service';

@Injectable()
export class RolesService {
  private roles: Role[] = [];

  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly configService: ConfigService
  ) {}

  public async getConfig(): Promise<GetRolesConfigDto> {
    await this.syncRoles();

    return {
      roles: this.configService.map(this.roles),
    };
  }

  public async getById(roleId: string): Promise<Role> {
    await this.syncRoles();

    return this.roles.find(({ id }: Role) => id === roleId);
  }

  private async syncRoles(): Promise<void> {
    if (isEmpty(this.roles)) {
      this.roles = await this.roleRepo.find();
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { GetRolesConfigDto } from './roles.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class RolesService {
  private roles: Role[] = [];

  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {}

  public async getConfig(): Promise<GetRolesConfigDto> {
    await this.syncRoles();

    return {
      roles: this.roles.map(({ id, title }) => ({ title, key: id })),
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

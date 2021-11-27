import { Role } from '../../users/roles/role.entity';

export type GetConfigDto = {
  key: string;
  title: string;
}[];

export type ConfigMappable = Role[];

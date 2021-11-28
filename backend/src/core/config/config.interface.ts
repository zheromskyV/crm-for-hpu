import { Role } from '../../users/roles/role.entity';
import { Status } from '../../requests/statuses/status.entity';
import { Type } from '../../requests/types/type.entity';

export type GetConfigDto = {
  key: string;
  title: string;
}[];

export type Configurable = Role | Type | Status;

export type ConfigMappable = Configurable[];

export interface ConfigServiceUser {
  getConfig(): Promise<unknown>;
  getById(id: string): Promise<Configurable>;
  sync(): Promise<void>;
}

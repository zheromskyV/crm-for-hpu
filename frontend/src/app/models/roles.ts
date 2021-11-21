import { Role } from '../constants/roles';

export interface RolesConfig {
  roles: {
    title: string;
    key: string;
  }[];
}

export interface Roles extends Record<Role, string> {}

import { Role } from '../constants/roles';
import { Config } from './core';

export interface RolesConfig {
  roles: Config;
}

export interface Roles extends Record<Role, string> {}

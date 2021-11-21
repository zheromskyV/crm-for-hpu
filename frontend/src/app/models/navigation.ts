import { Role } from '../constants/roles';

export interface NavigationLink {
  name: string;
  url: string;
  icon: string;
}

export interface Navigation extends Record<Role, NavigationLink[]> {}

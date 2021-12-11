import { Roles } from '../models/roles';

export enum Role {
  Admin = 'admin',
  Client = 'client',
  Agent = 'agent',
  ChatAgent = 'chat-agent',
}

export const initialRolesData: Roles = {
  [Role.Admin]: '',
  [Role.Client]: '',
  [Role.Agent]: '',
  [Role.ChatAgent]: '',
};

export const rolesForDropdown = [
  { value: Role.Admin, label: 'Администратор' },
  { value: Role.Client, label: 'Пользователь' },
  { value: Role.Agent, label: 'Агент' },
  { value: Role.ChatAgent, label: 'Чат-Агент' },
];

export const rolesForUI = {
  [Role.Admin]: 'Администратор',
  [Role.Client]: 'Пользователь',
  [Role.Agent]: 'Агент',
  [Role.ChatAgent]: 'Чат-Агент',
};

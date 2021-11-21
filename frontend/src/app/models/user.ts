import { Role } from '../constants/roles';

export interface User {
  id: string;
  email: string;
  roleId: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  birthday: Date;
  address: string;
  isVip?: boolean;
}

export interface CreateUserModel extends Omit<User, 'id' | 'roleId' | 'profile'> {
  role: Role;
  password: string;
  profile?: CreateUserProfileModel;
}

export interface CreateUserProfileModel extends Omit<UserProfile, 'id' | 'isVip'> {}

export interface CreateUserBackendModel extends Omit<CreateUserModel, 'role'> {
  roleId: string;
}

export interface UserInfo extends Omit<User, 'roleId'> {
  role: Role;
}

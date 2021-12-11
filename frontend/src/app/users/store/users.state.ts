import { UserInfo } from '../../models/user';

export interface UsersState {
  users: UserInfo[];
}

export const initialUsersState: UsersState = {
  users: [],
};

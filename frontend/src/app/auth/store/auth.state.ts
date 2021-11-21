import { User } from '../../models/user';
import { Role } from '../../constants/roles';

export interface AuthState {
  isUserLoggedIn: boolean;
  currentUser: User;
  currentRole: Role;
}

export const initialAuthState: AuthState = {
  isUserLoggedIn: false,
  currentUser: { id: '', email: '', roleId: '' },
  currentRole: Role.Client,
};

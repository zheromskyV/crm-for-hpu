import { createAction, props } from '@ngrx/store';
import { CreateUserModel, User, UserProfile } from '../../models/user';
import { Role } from '../../constants/roles';

const setUserLoggedIn = createAction('[AUTH] SET_USER_LOGGED_IN', props<{ isUserLoggedIn: boolean }>());

const logIn = createAction('[AUTH] LOG_IN', props<{ email: string; password: string }>());

const initSession = createAction('[AUTH] INIT_SESSION');

const logOut = createAction('[AUTH] LOG_OUT');

const setCurrentUser = createAction('[AUTH] SET_CURRENT_USER', props<{ user: User }>());

const setCurrentUserProfile = createAction('[AUTH] SET_CURRENT_USER_PROFILE', props<{ profile: UserProfile }>());

const clearCurrentUser = createAction('[AUTH] CLEAR_CURRENT_USER');

const setCurrentRole = createAction('[AUTH] SET_CURRENT_ROLE', props<{ role: Role }>());

const clearCurrentRole = createAction('[AUTH] CLEAR_CURRENT_ROLE');

const register = createAction('[AUTH] REGISTER', props<{ user: CreateUserModel }>());

export const AuthActions = {
  setUserLoggedIn,
  logIn,
  initSession,
  logOut,
  setCurrentUser,
  setCurrentUserProfile,
  clearCurrentUser,
  setCurrentRole,
  clearCurrentRole,
  register,
};

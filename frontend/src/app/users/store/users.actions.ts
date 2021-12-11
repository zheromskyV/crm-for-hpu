import { createAction, props } from '@ngrx/store';
import { UserInfo, UserProfile } from '../../models/user';

const loadUsers = createAction('[USERS] LOAD_USERS');

const setUsers = createAction('[USERS] SET_USERS', props<{ users: UserInfo[] }>());

const updateProfile = createAction('[USERS] UPDATE_PROFILE', props<{ profile: UserProfile }>());

const clearUsers = createAction('[USERS] CLEAR_USERS');

export const UsersActions = { updateProfile, loadUsers, setUsers, clearUsers };

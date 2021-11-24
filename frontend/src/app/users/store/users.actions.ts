import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../../models/user';

const updateProfile = createAction('[USERS] UPDATE_PROFILE', props<{ profile: UserProfile }>());

export const UsersActions = { updateProfile };

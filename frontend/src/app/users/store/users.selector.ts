import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { UsersState } from './users.state';
import { UserInfo } from '../../models/user';

const rootSelector = createFeatureSelector<UsersState>(StoreFeature.Users);

const getUsers = createSelector(rootSelector, (state: UsersState): UserInfo[] => state.users);

export const FromUsers = { getUsers };

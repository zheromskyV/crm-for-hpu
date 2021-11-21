import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { StoreFeature } from '../../constants/store.enum';
import { User } from '../../models/user';
import { Role } from '../../constants/roles';

const rootSelector = createFeatureSelector<AuthState>(StoreFeature.Auth);

const getUserLoggedIn = createSelector(rootSelector, (state: AuthState): boolean => state.isUserLoggedIn);

const getCurrentUser = createSelector(rootSelector, (state: AuthState): User => state.currentUser);

const getCurrentRole = createSelector(rootSelector, (state: AuthState): Role => state.currentRole);

export const FromAuth = { getUserLoggedIn, getCurrentUser, getCurrentRole };

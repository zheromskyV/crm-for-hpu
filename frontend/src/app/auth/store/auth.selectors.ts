import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { StoreFeature } from '../../constants/store.enum';

const rootSelector = createFeatureSelector<AuthState>(StoreFeature.Auth);

const getUserLoggedIn = createSelector(rootSelector, (state: AuthState): boolean => state.isUserLoggedIn);

export const FromAuth = { getUserLoggedIn };

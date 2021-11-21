import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.state';
import { StoreFeature } from '../../constants/store.enum';
import { Roles } from '../../models/roles';

const rootSelector = createFeatureSelector<CoreState>(StoreFeature.Core);

const getRoles = createSelector(rootSelector, (state: CoreState): Roles => state.roles);

export const FromCore = { getRoles };

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.state';
import { StoreFeature } from '../../constants/store.enum';
import { Roles } from '../../models/roles';
import { RequestStatuses, RequestTypes } from '../../models/request';

const rootSelector = createFeatureSelector<CoreState>(StoreFeature.Core);

const getRoles = createSelector(rootSelector, (state: CoreState): Roles => state.roles);

const getRequestTypes = createSelector(rootSelector, (state: CoreState): RequestTypes => state.requestTypes);

const getRequestStatuses = createSelector(rootSelector, (state: CoreState): RequestStatuses => state.requestStatuses);

export const FromCore = { getRoles, getRequestTypes, getRequestStatuses };

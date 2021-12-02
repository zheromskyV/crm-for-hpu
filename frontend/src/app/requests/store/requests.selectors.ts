import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsState } from './requests.state';
import { StoreFeature } from '../../constants/store.enum';
import { Request } from '../../models/request';

const rootSelector = createFeatureSelector<RequestsState>(StoreFeature.Requests);

const getRequests = createSelector(rootSelector, (state: RequestsState): Request[] => state.requests);

export const FromRequests = { getRequests };

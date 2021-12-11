import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticsState } from './analytics.state';
import { StoreFeature } from '../../constants/store.enum';
import { AnalyticsData } from '../../models/analytics';

const rootSelector = createFeatureSelector<AnalyticsState>(StoreFeature.Analytics);

const getRequestTypesAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): AnalyticsData[] => state.requestTypes
);

const getRequestStatusesAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): AnalyticsData[] => state.requestStatuses
);

const getRequestsByDayAnalytics = createSelector(
  rootSelector,
  (state: AnalyticsState): AnalyticsData[] => state.requestsByDay
);

export const FromAnalytics = { getRequestTypesAnalytics, getRequestStatusesAnalytics, getRequestsByDayAnalytics };

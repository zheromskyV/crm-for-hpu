import { createAction, props } from '@ngrx/store';
import { AnalyticsData } from '../../models/analytics';

const loadAnalytics = createAction('[ANALYTICS] LOAD_ANALYTICS');

const setAnalytics = createAction(
  '[ANALYTICS] SET_ANALYTICS',
  props<{ requestTypes: AnalyticsData[]; requestStatuses: AnalyticsData[]; requestsByDay: AnalyticsData[] }>()
);

const clearAnalytics = createAction('[ANALYTICS] CLEAR_ANALYTICS');

export const AnalyticsActions = { loadAnalytics, setAnalytics, clearAnalytics };

import { Action, createReducer, on } from '@ngrx/store';
import { AnalyticsState, initialAnalyticsState } from './analytics.state';
import { AnalyticsActions } from './analytics.actions';

const reducer = createReducer(
  initialAnalyticsState,
  on(AnalyticsActions.setAnalytics, (state, { requestTypes, requestStatuses, requestsByDay }) => ({
    ...state,
    requestTypes,
    requestStatuses,
    requestsByDay,
  })),
  on(AnalyticsActions.clearAnalytics, (state) => ({
    ...state,
    requestTypes: initialAnalyticsState.requestTypes,
    requestStatuses: initialAnalyticsState.requestStatuses,
    requestsByDay: initialAnalyticsState.requestsByDay,
  }))
);

export function analyticsReducer(state: AnalyticsState | undefined, action: Action): any {
  return reducer(state, action);
}

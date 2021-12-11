import { Action, createReducer, on } from '@ngrx/store';
import { AnalyticsState, initialAnalyticsState } from './analytics.state';
import { AnalyticsActions } from './analytics.actions';

const reducer = createReducer(
  initialAnalyticsState,
  on(AnalyticsActions.setAnalytics, (state, { requestTypes, requestStatuses, requestsByDay, feedback, assignee }) => ({
    ...state,
    requestTypes,
    requestStatuses,
    requestsByDay,
    feedback,
    assignee,
  })),
  on(AnalyticsActions.clearAnalytics, (state) => ({
    ...state,
    requestTypes: initialAnalyticsState.requestTypes,
    requestStatuses: initialAnalyticsState.requestStatuses,
    requestsByDay: initialAnalyticsState.requestsByDay,
    feedback: initialAnalyticsState.feedback,
    assignee: initialAnalyticsState.assignee,
  }))
);

export function analyticsReducer(state: AnalyticsState | undefined, action: Action): any {
  return reducer(state, action);
}

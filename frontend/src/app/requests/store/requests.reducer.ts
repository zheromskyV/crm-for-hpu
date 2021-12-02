import { Action, createReducer, on } from '@ngrx/store';
import { RequestsState, initialRequestsState } from './requests.state';
import { RequestsActions } from './requests.actions';

const reducer = createReducer(
  initialRequestsState,
  on(RequestsActions.setRequests, (state, { requests }) => ({
    ...state,
    requests,
  })),
  on(RequestsActions.clearRequests, (state) => ({
    ...state,
    requests: initialRequestsState.requests,
  }))
);

export function requestsReducer(state: RequestsState | undefined, action: Action): any {
  return reducer(state, action);
}

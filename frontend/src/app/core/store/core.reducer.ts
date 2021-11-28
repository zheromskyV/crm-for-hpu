import { Action, createReducer, on } from '@ngrx/store';
import { CoreState, initialCoreState } from './core.state';
import { CoreActions } from './core.actions';

const reducer = createReducer(
  initialCoreState,
  on(CoreActions.setRoles, (state, { roles }) => ({
    ...state,
    roles,
  })),
  on(CoreActions.setRequestStatuses, (state, { requestStatuses }) => ({
    ...state,
    requestStatuses,
  })),
  on(CoreActions.setRequestTypes, (state, { requestTypes }) => ({
    ...state,
    requestTypes,
  }))
);

export function coreReducer(state: CoreState | undefined, action: Action): any {
  return reducer(state, action);
}

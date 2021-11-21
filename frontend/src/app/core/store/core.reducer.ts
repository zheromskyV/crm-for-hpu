import { Action, createReducer, on } from '@ngrx/store';
import { CoreState, initialCoreState } from './core.state';
import { CoreActions } from './core.actions';

const reducer = createReducer(
  initialCoreState,
  on(CoreActions.setRoles, (state, { roles }) => ({
    ...state,
    roles,
  }))
);

export function coreReducer(state: CoreState | undefined, action: Action): any {
  return reducer(state, action);
}

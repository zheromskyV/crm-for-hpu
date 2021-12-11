import { Action, createReducer, on } from '@ngrx/store';
import { initialUsersState, UsersState } from './users.state';
import { UsersActions } from './users.actions';

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.setUsers, (state, { users }) => ({
    ...state,
    users,
  })),
  on(UsersActions.clearUsers, (state) => ({
    ...state,
    users: initialUsersState.users,
  }))
);

export function usersReduces(state: UsersState | undefined, action: Action): any {
  return reducer(state, action);
}

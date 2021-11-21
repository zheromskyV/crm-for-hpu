import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import { AuthActions } from './auth.actions';

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.setUserLoggedIn, (state, { isUserLoggedIn }) => ({
    ...state,
    isUserLoggedIn,
  })),
  on(AuthActions.setCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  })),
  on(AuthActions.setCurrentRole, (state, { role }) => ({
    ...state,
    currentRole: role,
  })),
  on(AuthActions.clearCurrentUser, (state) => ({
    ...state,
    currentUser: initialAuthState.currentUser,
  })),
  on(AuthActions.clearCurrentRole, (state) => ({
    ...state,
    currentRole: initialAuthState.currentRole,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action): any {
  return reducer(state, action);
}

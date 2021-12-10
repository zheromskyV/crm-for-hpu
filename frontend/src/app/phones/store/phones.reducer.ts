import { Action, createReducer, on } from '@ngrx/store';
import { PhonesState, initialPhonesState } from './phones.state';
import { PhonesActions } from './phones.actions';

const reducer = createReducer(
  initialPhonesState,
  on(PhonesActions.setPhones, (state, { phones }) => ({
    ...state,
    phones,
  })),
  on(PhonesActions.clearPhones, (state) => ({
    ...state,
    phones: initialPhonesState.phones,
  }))
);

export function phonesReducer(state: PhonesState | undefined, action: Action): any {
  return reducer(state, action);
}

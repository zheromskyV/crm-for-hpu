import { createAction, props } from '@ngrx/store';
import { Phone } from '../../models/phone';

const loadPhones = createAction('[PHONES] LOAD_PHONES');

const setPhones = createAction('[PHONES] SET_PHONES', props<{ phones: Phone[] }>());

const clearPhones = createAction('[PHONES] CLEAR_PHONES');

const requestCall = createAction('[PHONES] REQUEST_CALL', props<{ phoneNumber: string }>());

export const PhonesActions = { loadPhones, setPhones, clearPhones, requestCall };

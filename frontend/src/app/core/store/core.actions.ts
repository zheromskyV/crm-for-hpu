import { createAction, props } from '@ngrx/store';
import { Roles } from '../../models/roles';
import { RequestStatuses, RequestTypes } from '../../models/request';

const init = createAction('[CORE] INIT');

const setRoles = createAction('[CORE] SET_ROLES', props<{ roles: Roles }>());

const loadRoles = createAction('[CORE] LOAD_ROLES');

const setRequestTypes = createAction('[CORE] SET_REQUEST_TYPES', props<{ requestTypes: RequestTypes }>());

const loadRequestTypes = createAction('[CORE] LOAD_REQUEST_TYPES');

const setRequestStatuses = createAction('[CORE] SET_REQUEST_STATUSES', props<{ requestStatuses: RequestStatuses }>());

const loadRequestStatuses = createAction('[CORE] LOAD_REQUEST_STATUSES');

export const CoreActions = {
  init,
  setRoles,
  loadRoles,
  setRequestTypes,
  loadRequestTypes,
  setRequestStatuses,
  loadRequestStatuses,
};

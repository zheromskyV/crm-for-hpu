import { createAction, props } from '@ngrx/store';
import { Roles } from '../../models/roles';

const init = createAction('[CORE] INIT');

const setRoles = createAction('[CORE] SET_ROLES', props<{ roles: Roles }>());

const loadRoles = createAction('[CORE] LOAD_ROLES');

export const CoreActions = { init, setRoles, loadRoles };

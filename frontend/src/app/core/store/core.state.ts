import { Roles } from '../../models/roles';
import { initialRolesData } from '../../constants/roles';

export interface CoreState {
  roles: Roles;
}

export const initialCoreState: CoreState = {
  roles: initialRolesData,
};

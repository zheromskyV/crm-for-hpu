import { Roles } from '../../models/roles';
import { initialRolesData } from '../../constants/roles';
import { RequestStatuses, RequestTypes } from '../../models/request';
import { initialRequestStatusesData, initialRequestTypesData } from '../../constants/requsts';

export interface CoreState {
  roles: Roles;
  requestTypes: RequestTypes;
  requestStatuses: RequestStatuses;
}

export const initialCoreState: CoreState = {
  roles: initialRolesData,
  requestTypes: initialRequestTypesData,
  requestStatuses: initialRequestStatusesData,
};

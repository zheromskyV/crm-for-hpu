import { Request } from '../../models/request';

export interface RequestsState {
  requests: Request[];
}

export const initialRequestsState: RequestsState = {
  requests: [],
};

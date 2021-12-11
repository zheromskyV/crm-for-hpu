import { createAction, props } from '@ngrx/store';
import { CreateFeedBackendModel, CreateRequestModel, Request, RequestInfo } from '../../models/request';
import { User } from '../../models/user';

const loadAllRequests = createAction('[REQUESTS] LOAD_ALL_REQUESTS');

const loadUserRequests = createAction('[REQUESTS] LOAD_USER_REQUESTS', props<{ user: User }>());

const setRequests = createAction('[REQUESTS] SET_REQUESTS', props<{ requests: Request[] }>());

const submitRequest = createAction('[REQUESTS] SUBMIT_REQUEST', props<{ request: CreateRequestModel }>());

const addRequest = createAction('[REQUESTS] ADD_REQUEST', props<{ request: Request }>());

const updateRequest = createAction('[REQUESTS] UPDATE_REQUEST', props<{ request: RequestInfo }>());

const submitFeed = createAction('[REQUESTS] SUBMIT_FEED', props<{ feed: CreateFeedBackendModel }>());

const updateRequestsState = createAction('[REQUESTS] UPDATE_REQUESTS_STATE', props<{ request: Request }>());

const deleteRequest = createAction('[REQUESTS] DELETE_REQUEST', props<{ request: Request }>());

const clearRequests = createAction('[REQUESTS] CLEAR_REQUEST');

const createReport = createAction('[REQUESTS] CREATE_REPORT', props<{ request: RequestInfo }>());

export const RequestsActions = {
  loadAllRequests,
  loadUserRequests,
  setRequests,
  submitRequest,
  addRequest,
  updateRequest,
  submitFeed,
  updateRequestsState,
  deleteRequest,
  clearRequests,
  createReport,
};

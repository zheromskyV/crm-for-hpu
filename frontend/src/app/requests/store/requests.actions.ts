import { createAction, props } from '@ngrx/store';
import { CreateFeedBackendModel, CreateRequestModel, Feed, Request } from '../../models/request';
import { User } from '../../models/user';

const loadAllRequests = createAction('[REQUESTS] LOAD_ALL_REQUESTS');

const loadUserRequests = createAction('[REQUESTS] LOAD_USER_REQUESTS', props<{ user: User }>());

const setRequests = createAction('[REQUESTS] SET_REQUESTS', props<{ requests: Request[] }>());

const submitRequest = createAction('[REQUESTS] SUBMIT_REQUEST', props<{ request: CreateRequestModel }>());

const addRequest = createAction('[REQUESTS] ADD_REQUEST', props<{ request: Request }>());

const submitFeed = createAction('[REQUESTS] SUBMIT_FEED', props<{ feed: CreateFeedBackendModel }>());

const addFeed = createAction('[REQUESTS] ADD_REQUEST', props<{ feed: Feed, requestId: string }>());

const updateRequest = createAction('[REQUESTS] UPDATE_REQUEST', props<{ request: Request }>());

const deleteRequest = createAction('[REQUESTS] DELETE_REQUEST', props<{ request: Request }>());

const clearRequests = createAction('[REQUESTS] CLEAR_REQUEST');

export const RequestsActions = {
  loadAllRequests,
  loadUserRequests,
  setRequests,
  submitRequest,
  addRequest,
  submitFeed,
  addFeed,
  updateRequest,
  deleteRequest,
  clearRequests,
};

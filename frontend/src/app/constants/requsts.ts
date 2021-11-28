import { RequestStatuses, RequestTypes } from '../models/request';

export enum RequestStatus {
  Opened = 'opened',
  InProgress = 'inProgress',
  Closed = 'closed',
  Draft = 'draft',
}

export enum RequestType {
  Incident = 'incident',
  Feedback = 'feedback',
  Bug = 'bug',
  Feature = 'feature',
  Email = 'email',
}

export enum RequestUrgency {
  Low = 0,
  Medium = 1,
  High = 2,
  Urgent = 3,
}

export const initialRequestStatusesData: RequestStatuses = {
  [RequestStatus.Opened]: '',
  [RequestStatus.InProgress]: '',
  [RequestStatus.Closed]: '',
  [RequestStatus.Draft]: '',
};

export const initialRequestTypesData: RequestTypes = {
  [RequestType.Incident]: '',
  [RequestType.Feedback]: '',
  [RequestType.Bug]: '',
  [RequestType.Feature]: '',
  [RequestType.Email]: '',
};

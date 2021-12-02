import { User, UserInfo } from './user';
import { Config } from './core';
import { RequestStatus, RequestType } from '../constants/requsts';

export interface Request {
  id: string;
  code: number;
  message: string;
  urgency: number;
  statusId: string;
  typeId: string;
  createdBy: User;
  assignedTo?: User;
  createdAt: Date;
  updatedAt: Date;
  feeds: Feed[];
  mailTo?: string;
  subject?: string;
  linkedRequestCode?: string;
  researchParticipation?: boolean;
  rating?: number;
  numberOfAffected?: number;
}

export interface Feed {
  id: string;
  message: string;
  createdAt: Date;
  createdBy: User;
}

export interface CreateRequestModel
  extends Omit<
    Request,
    'id' | 'code' | 'statusId' | 'typeId' | 'feeds' | 'createdAt' | 'updatedAt' | 'createdBy' | 'assignedTo'
  > {
  status: RequestStatus;
  type: RequestType;
}

export interface CreateRequestBackendModel extends Omit<CreateRequestModel, 'status' | 'type'> {
  statusId: string;
  typeId: string;
}

export interface RequestInfo extends Omit<Request, 'statusId' | 'typeId' | 'feeds' | 'createdBy' | 'assignedTo'> {
  status: RequestStatus;
  type: RequestType;
  feeds: FeedInfo[];
  createdBy: UserInfo;
  assignedTo: UserInfo;
}

export interface FeedInfo extends Omit<Feed, 'createdBy'> {
  createdBy: UserInfo;
}

export interface RequestStatusesConfig {
  statuses: Config[];
}

export interface RequestTypesConfig {
  types: Config[];
}

export interface RequestStatuses extends Record<RequestStatus, string> {}

export interface RequestTypes extends Record<RequestType, string> {}

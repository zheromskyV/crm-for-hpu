import { GetUserDto } from '../users/users.dto';
import { GetFeedDto } from './feeds/feeds.dto';

export interface GetRequestDto {
  id: string;
  code: number;
  message: string;
  urgency: number;
  statusId: string;
  typeId: string;
  createdBy: GetUserDto;
  assignedTo: GetUserDto;
  createdAt: Date;
  updatedAt: Date;
  feeds: GetFeedDto[];
  mailTo?: string;
  subject?: string;
  linkedRequestCode?: number;
  researchParticipation?: boolean;
  rating?: number;
  numberOfAffected?: number;
}

export interface CreateRequestDto {
  message: string;
  urgency: number;
  statusId: string;
  typeId: string;
  mailTo?: string;
  subject?: string;
  linkedRequestCode?: number;
  researchParticipation?: boolean;
  rating?: number;
  numberOfAffected?: number;
}

export interface UpdateRequestDto {
  id: string;
  message: string;
  urgency: number;
  statusId: string;
  typeId: string;
  mailTo?: string;
  subject?: string;
  linkedRequestCode?: number;
  researchParticipation?: boolean;
  rating?: number;
  numberOfAffected?: number;
  assignedToId?: string;
}

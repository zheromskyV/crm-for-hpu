import { GetUserDto } from '../../users/users.dto';

export interface GetFeedDto {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: GetUserDto;
}

import { CreateProfileDto, GetProfileDto } from './profiles/profiles.dto';

export interface CreateUserDto {
  email: string;
  password: string;
  roleId: string;
  profile?: CreateProfileDto;
}

export interface GetUserDto {
  id: string;
  email: string;
  roleId: string;
  profile?: GetProfileDto;
}

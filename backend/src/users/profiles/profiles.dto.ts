export interface CreateProfileDto {
  name: string;
  surname: string;
  birthday: Date;
  address: string;
  isVip?: boolean;
}

export interface GetProfileDto {
  id: string;
  name: string;
  surname: string;
  birthday: Date;
  isVip: boolean;
  address: string;
}

export type UpdateProfileDto = GetProfileDto;

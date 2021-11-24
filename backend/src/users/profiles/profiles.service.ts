import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto, GetProfileDto, UpdateProfileDto } from './profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private readonly profileRepo: Repository<Profile>) {}

  async create(profileDto: CreateProfileDto): Promise<Profile> {
    return this.profileRepo.save(profileDto);
  }

  async update(profileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileRepo.save(profileDto);
  }

  mapToSend({ id, name, surname, birthday, address, isVip }: Profile): GetProfileDto {
    return { id, name, surname, birthday, address, isVip };
  }
}

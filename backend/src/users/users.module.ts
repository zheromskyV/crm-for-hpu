import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesService } from './roles/roles.service';
import { ProfilesService } from './profiles/profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles/profile.entity';
import { Role } from './roles/role.entity';
import { User } from './user.entity';
import { RolesController } from './roles/roles.controller';
import { CoreModule } from '../core/core.module';

@Module({
  providers: [UsersService, RolesService, ProfilesService],
  controllers: [UsersController, RolesController],
  imports: [TypeOrmModule.forFeature([User, Role, Profile]), CoreModule],
  exports: [UsersService, RolesService, ProfilesService],
})
export class UsersModule {}

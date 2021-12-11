import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { AuthModule } from '../auth/auth.module';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [ProfileComponent, ViewUsersComponent],
  imports: [SharedModule, UsersRoutingModule, AuthModule, TableModule, TagModule],
})
export class UsersModule {}

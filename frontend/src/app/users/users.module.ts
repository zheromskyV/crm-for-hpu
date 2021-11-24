import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [SharedModule, UsersRoutingModule, AuthModule],
})
export class UsersModule {}

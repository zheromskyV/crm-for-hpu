import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [SharedModule, UsersRoutingModule],
})
export class UsersModule {}

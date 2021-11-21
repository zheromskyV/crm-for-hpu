import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: routerPaths.users.profile,
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

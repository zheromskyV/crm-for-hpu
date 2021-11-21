import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: routerPaths.auth.login,
    component: LoginComponent,
  },
  {
    path: routerPaths.auth.register,
    component: RegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

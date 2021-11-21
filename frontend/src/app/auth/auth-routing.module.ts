import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UtilsService } from '../core/services/utils.service';

const routes: Routes = [
  UtilsService.defaultRedirect(routerPaths.login),
  {
    path: routerPaths.login,
    component: LoginComponent,
  },
  {
    path: routerPaths.registration,
    component: RegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

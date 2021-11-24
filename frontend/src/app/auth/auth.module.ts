import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordModule } from 'primeng/password';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [AuthPageContainerComponent, LoginComponent, RegistrationComponent, UserFormComponent],
  imports: [AuthRoutingModule, SharedModule, PasswordModule],
  exports: [UserFormComponent],
})
export class AuthModule {}

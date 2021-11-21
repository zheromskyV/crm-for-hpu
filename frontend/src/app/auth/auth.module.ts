import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [AuthPageContainerComponent, LoginComponent, RegistrationComponent],
  imports: [AuthRoutingModule, SharedModule, PasswordModule],
})
export class AuthModule {}

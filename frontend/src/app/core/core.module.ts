import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [LayoutContainerComponent, NavigationBarComponent, NotificationComponent],
  imports: [CommonModule, ButtonModule, DividerModule, ToastModule],
  exports: [LayoutContainerComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }
  }
}

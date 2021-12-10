import { NgModule } from '@angular/core';
import { PhonesRoutingModule } from './phones-routing.module';
import { CallUsPageComponent } from './components/call-us-page/call-us-page.component';
import { RequestCallComponent } from './components/request-call/request-call.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { SharedModule } from '../shared/shared.module';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [CallUsPageComponent, RequestCallComponent, PhoneListComponent],
  imports: [SharedModule, PhonesRoutingModule, InputMaskModule],
})
export class PhonesModule {}

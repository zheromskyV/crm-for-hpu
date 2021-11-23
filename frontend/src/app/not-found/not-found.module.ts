import { NgModule } from '@angular/core';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [SharedModule, NotFoundRoutingModule],
})
export class NotFoundModule {}

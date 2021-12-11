import { NgModule } from '@angular/core';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';
import { SharedModule } from '../shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [AnalyticsPageComponent],
  imports: [SharedModule, AnalyticsRoutingModule, ChartModule],
})
export class AnalyticsModule {}

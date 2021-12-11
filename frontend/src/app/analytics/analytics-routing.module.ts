import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { AnalyticsPageComponent } from './components/analytics-page/analytics-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: AnalyticsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}

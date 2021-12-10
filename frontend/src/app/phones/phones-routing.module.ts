import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { CallUsPageComponent } from './components/call-us-page/call-us-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: CallUsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhonesRoutingModule {}

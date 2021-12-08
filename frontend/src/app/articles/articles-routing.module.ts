import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from '../constants/router-paths';
import { ArticlesPageComponent } from './components/articles-page/articles-page.component';

const routes: Routes = [
  {
    path: routerPaths.home,
    component: ArticlesPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}

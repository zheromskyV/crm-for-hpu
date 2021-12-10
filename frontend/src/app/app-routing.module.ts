import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from './constants/router-paths';
import { AuthGuardService } from './core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: routerPaths.auth.home,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: routerPaths.requests.home,
    loadChildren: () => import('./requests/requests.module').then((m) => m.RequestsModule),
  },
  {
    path: routerPaths.users.home,
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: routerPaths.articles.home,
    loadChildren: () => import('./articles/articles.module').then((m) => m.ArticlesModule),
  },
  {
    path: routerPaths.phones.home,
    loadChildren: () => import('./phones/phones.module').then((m) => m.PhonesModule),
  },
  {
    path: routerPaths.notFound,
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: routerPaths.notFound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

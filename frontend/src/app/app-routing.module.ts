import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routerPaths } from './constants/router-paths';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

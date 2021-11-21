import { routerPaths } from '../../constants/router-paths';
import { Route } from '@angular/router';

export class UtilsService {
  static defaultRedirect(redirectTo: string): Route {
    return {
      path: routerPaths.home,
      pathMatch: 'full',
      redirectTo,
    };
  }
}

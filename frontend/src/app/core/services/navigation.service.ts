import { Router } from '@angular/router';
import { routerPaths } from '../../constants/router-paths';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly router: Router, private readonly zone: NgZone) {}

  navigateTo(commands: string | string[]): void {
    this.zone.run(() => {
      this.router.navigate(commands instanceof Array ? commands : [commands], { replaceUrl: true });
    });
  }

  navigateToHomePage(): void {
    this.navigateTo([routerPaths.users.home, routerPaths.users.profile]);
  }

  navigateToLoginPage(): void {
    this.navigateTo([routerPaths.auth.home, routerPaths.auth.login]);
  }

  navigateToRegistrationPage(): void {
    this.navigateTo([routerPaths.auth.home, routerPaths.auth.register]);
  }
}

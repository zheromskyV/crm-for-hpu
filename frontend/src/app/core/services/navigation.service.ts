import { Router } from '@angular/router';
import { routerPaths } from '../../constants/router-paths';
import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly router: Router, private readonly zone: NgZone) {}

  private static getAuthPage(subPage: string): string {
    return `${routerPaths.auth.home}/${subPage}`;
  }

  navigateTo(route: string): void {
    this.zone.run(() => {
      this.router.navigate([route], { replaceUrl: true });
    });
  }

  navigateToHomePage(): void {
    this.navigateTo(routerPaths.home);
  }

  navigateToLoginPage(): void {
    this.navigateTo(NavigationService.getAuthPage(routerPaths.auth.login));
  }

  navigateToRegistrationPage(): void {
    this.navigateTo(NavigationService.getAuthPage(routerPaths.auth.register));
  }
}

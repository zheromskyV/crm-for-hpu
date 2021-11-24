import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { NavigationService } from '../services/navigation.service';
import { Observable } from 'rxjs';
import { FromAuth } from '../../auth/store/auth.selectors';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private readonly store: Store<AppState>, private readonly navigationService: NavigationService) {}

  canActivate(): Observable<boolean> {
    return this.store.select(FromAuth.getUserLoggedIn).pipe(
      map((isUserLoggedIn: boolean) => {
        if (!isUserLoggedIn) {
          this.redirectUnauthorizedUser();
        }

        return isUserLoggedIn;
      }),
      first()
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }

  private redirectUnauthorizedUser(): void {
    this.navigationService.navigateToLoginPage();
  }
}

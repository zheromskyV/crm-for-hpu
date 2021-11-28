import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import { AuthActions } from './auth.actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';
import { UsersService } from '../../users/services/users.service';
import { CreateUserBackendModel, User } from '../../models/user';
import { Role } from '../../constants/roles';
import { RolesService } from '../../core/services/roles.service';
import { NotificationService } from '../../core/services/notification.service';
import { FromCore } from '../../core/store/core.selectors';
import { Nullable } from '../../models/core';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly navigationService: NavigationService,
    private readonly notificationService: NotificationService
  ) {}

  logIn$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      switchMap(({ email, password }) => this.authService.login(email, password)),
      tap(({ token }) =>
        token ? this.authService.saveToken(token) : this.notificationService.error('Неверный логин или пароль')
      ),
      switchMap(() => [AuthActions.initSession()])
    )
  );

  register$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      withLatestFrom(this.store.select(FromCore.getRoles)),
      map(([{ user }, roles]) => this.usersService.getBackendCreateUserModel(user, roles)),
      switchMap((user: CreateUserBackendModel) => this.authService.register(user)),
      tap(({ token }) => {
        if (token) {
          this.notificationService.success('Аккаунт зарегистрирован');
          this.authService.saveToken(token);
          return;
        }

        this.notificationService.error('Аккаунт с таким логином (почтой) уже существует');
      }),
      switchMap(() => [AuthActions.initSession()])
    )
  );

  initSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initSession),
      switchMap(() => this.usersService.getMe$()),
      switchMap((user: Nullable<User>) =>
        user
          ? this.rolesService.getById$(user.roleId).pipe(
              tap(() => this.navigationService.navigateToHomePage()),
              tap(() =>
                this.notificationService.success(`Добро пожаловать${user.profile ? `, ${user.profile.name}` : ''}`)
              ),
              switchMap((role: Role) => [
                AuthActions.setUserLoggedIn({ isUserLoggedIn: true }),
                AuthActions.setCurrentUser({ user }),
                AuthActions.setCurrentRole({ role }),
              ])
            )
          : []
      )
    )
  );

  logOut$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => this.authService.clearToken()),
      tap(() => this.navigationService.navigateToLoginPage()),
      switchMap(() => [
        AuthActions.setUserLoggedIn({ isUserLoggedIn: false }),
        AuthActions.clearCurrentRole(),
        AuthActions.clearCurrentUser(),
      ])
    )
  );
}

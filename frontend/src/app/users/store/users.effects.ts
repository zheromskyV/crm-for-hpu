import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { UsersActions } from './users.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { UserInfo, UserProfile } from '../../models/user';
import { Nullable } from '../../models/core';
import { AuthActions } from '../../auth/store/auth.actions';
import { NotificationService } from '../../core/services/notification.service';
import { AppState } from '../../app.state';
import { FromAuth } from '../../auth/store/auth.selectors';
import { Role } from '../../constants/roles';

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService
  ) {}

  updateProfile$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateProfile),
      switchMap(({ profile }) => this.usersService.updateProfile$(profile)),
      withLatestFrom(this.store.select(FromAuth.getCurrentRole)),
      switchMap(([profile, role]: [Nullable<UserProfile>, Role]) => {
        if (!profile) {
          this.notificationService.error('Ошибка при обновлении профиля');

          return EMPTY;
        }

        this.notificationService.success('Профиль обновлен');

        return role === Role.Client ? [AuthActions.setCurrentUserProfile({ profile })] : [UsersActions.loadUsers()];
      })
    )
  );

  loadUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() => this.usersService.getAll$()),
      switchMap((users: UserInfo[]) => [UsersActions.setUsers({ users })])
    )
  );
}

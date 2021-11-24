import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { UsersActions } from './users.actions';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { UserProfile } from '../../models/user';
import { Nullable } from '../../models/core';
import { AuthActions } from '../../auth/store/auth.actions';
import { NotificationService } from '../../core/services/notification.service';

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService
  ) {}

  updateProfile: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateProfile),
      switchMap(({ profile }) => this.usersService.updateProfile$(profile)),
      switchMap((profile: Nullable<UserProfile>) => {
        if (!profile) {
          this.notificationService.error('Ошибка при обновлении профиля');

          return EMPTY;
        }

        this.notificationService.success('Профиль обновлен');

        return [AuthActions.setCurrentUserProfile({ profile })];
      })
    )
  );
}

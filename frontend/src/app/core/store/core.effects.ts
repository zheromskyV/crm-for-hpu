import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Observable } from 'rxjs';
import { CoreActions } from './core.actions';
import { switchMap } from 'rxjs/operators';
import { RolesService } from '../services/roles.service';
import { Roles } from '../../models/roles';
import { AuthActions } from '../../auth/store/auth.actions';

@Injectable()
export class CoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly rolesService: RolesService
  ) {}

  init$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.init),
      switchMap(() => [CoreActions.loadRoles(), AuthActions.initSession()])
    )
  );

  loadRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadRoles),
      switchMap(() => this.rolesService.loadRoles()),
      switchMap((roles: Roles) => [CoreActions.setRoles({ roles })])
    )
  );
}

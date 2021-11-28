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
import { RequestTypesService } from '../services/request-types.service';
import { RequestStatusesService } from '../services/request-statuses.service';
import { RequestStatuses, RequestTypes } from '../../models/request';

@Injectable()
export class CoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly rolesService: RolesService,
    private readonly requestTypesService: RequestTypesService,
    private readonly requestStatusesService: RequestStatusesService
  ) {}

  init$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.init),
      switchMap(() => [
        CoreActions.loadRoles(),
        CoreActions.loadRequestTypes(),
        CoreActions.loadRequestStatuses(),
        AuthActions.initSession(),
      ])
    )
  );

  loadRoles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadRoles),
      switchMap(() => this.rolesService.load$()),
      switchMap((roles: Roles) => [CoreActions.setRoles({ roles })])
    )
  );

  loadRequestTypes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadRequestTypes),
      switchMap(() => this.requestTypesService.load$()),
      switchMap((requestTypes: RequestTypes) => [CoreActions.setRequestTypes({ requestTypes })])
    )
  );

  loadRequestStatuses$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.loadRequestStatuses),
      switchMap(() => this.requestStatusesService.load$()),
      switchMap((requestStatuses: RequestStatuses) => [CoreActions.setRequestStatuses({ requestStatuses })])
    )
  );
}

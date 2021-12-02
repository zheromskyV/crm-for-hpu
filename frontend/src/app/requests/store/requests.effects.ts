import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { combineLatest, Observable } from 'rxjs';
import { RequestsActions } from './requests.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CreateRequestBackendModel, Request } from '../../models/request';
import { RequestsService } from '../services/requests.service';
import { FromCore } from '../../core/store/core.selectors';
import { NotificationService } from '../../core/services/notification.service';
import { Nullable } from '../../models/core';
import { FromRequests } from './requests.selectors';

@Injectable()
export class RequestsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly requestsService: RequestsService,
    private readonly notificationService: NotificationService
  ) {}

  loadAllRequests$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.loadAllRequests),
      switchMap(() => this.requestsService.getAll$()),
      switchMap((requests: Request[]) => [RequestsActions.setRequests({ requests })])
    )
  );

  submitRequest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.submitRequest),
      withLatestFrom(
        combineLatest([this.store.select(FromCore.getRequestStatuses), this.store.select(FromCore.getRequestTypes)])
      ),
      map(([{ request }, [statuses, types]]) =>
        this.requestsService.getBackendCreateRequestModel(request, statuses, types)
      ),
      switchMap((request: CreateRequestBackendModel) => this.requestsService.create$(request)),
      switchMap((createdRequest: Nullable<Request>) => {
        if (!createdRequest) {
          this.notificationService.error('Не удалось отправить данные');
          return [];
        }

        this.notificationService.success('Данные успешно отправлены');

        return [RequestsActions.addRequest({ request: createdRequest })];
      })
    )
  );

  addRequest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.addRequest),
      withLatestFrom(this.store.select(FromRequests.getRequests)),
      switchMap(([{ request }, requests]) => [RequestsActions.setRequests({ requests: [...requests, request] })])
    )
  );
}

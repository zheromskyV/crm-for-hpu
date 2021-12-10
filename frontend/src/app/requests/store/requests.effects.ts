import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { combineLatest, Observable } from 'rxjs';
import { RequestsActions } from './requests.actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CreateRequestBackendModel, Request, UpdateRequestBackendModel } from '../../models/request';
import { RequestsService } from '../services/requests.service';
import { FromCore } from '../../core/store/core.selectors';
import { NotificationService } from '../../core/services/notification.service';
import { Nullable } from '../../models/core';
import { FromRequests } from './requests.selectors';
import { RequestType } from '../../constants/requsts';
import { EmailService } from '../../core/services/email.service';
import { FromAuth } from '../../auth/store/auth.selectors';
import { Role } from '../../constants/roles';

@Injectable()
export class RequestsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly requestsService: RequestsService,
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService
  ) {}

  loadAllRequests$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.loadAllRequests),
      withLatestFrom(this.store.select(FromAuth.getCurrentRole)),
      switchMap(([_, userRole]) =>
        userRole === Role.Admin ? this.requestsService.getAllMine$() : this.requestsService.getAll$()
      ),
      switchMap((requests: Request[]) => [RequestsActions.setRequests({ requests })])
    )
  );

  submitRequest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.submitRequest),
      tap(({ request }) => {
        if (request.type === RequestType.Email) {
          this.emailService.sendNotifyAgentEmail(request.mailTo, request.subject);
        }
      }),
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

  updateRequest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.updateRequest),
      withLatestFrom(
        combineLatest([this.store.select(FromCore.getRequestStatuses), this.store.select(FromCore.getRequestTypes)])
      ),
      map(([{ request }, [statuses, types]]) =>
        this.requestsService.getBackendUpdateRequestModel(request, statuses, types)
      ),
      switchMap((request: UpdateRequestBackendModel) => this.requestsService.update$(request)),
      switchMap((updatedRequest: Nullable<Request>) => {
        if (!updatedRequest) {
          this.notificationService.error('Не удалось отправить данные');
          return [];
        }

        this.notificationService.success('Данные успешно отправлены');

        return [RequestsActions.updateRequestsState({ request: updatedRequest })];
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

  submitFeed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.submitFeed),
      switchMap(({ feed }) => this.requestsService.addFeed$(feed)),
      switchMap((updatedRequest: Nullable<Request>) => {
        if (!updatedRequest) {
          this.notificationService.error('Не удалось отправить данные');
          return [];
        }

        this.notificationService.success('Данные успешно отправлены');

        return [RequestsActions.updateRequestsState({ request: updatedRequest })];
      })
    )
  );

  updateRequestsState$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestsActions.updateRequestsState),
      withLatestFrom(this.store.select(FromRequests.getRequests)),
      switchMap(([{ request: updatedRequest }, requests]) => {
        const updatedRequests: Request[] = requests.map((request: Request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        );

        return [RequestsActions.setRequests({ requests: updatedRequests })];
      })
    )
  );
}

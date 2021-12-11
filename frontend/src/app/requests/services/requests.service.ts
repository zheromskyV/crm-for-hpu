import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, from, Observable, of } from 'rxjs';
import { BASE_API_URL } from '../../constants/api';
import { catchError, filter, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import {
  CreateFeedBackendModel,
  CreateRequestBackendModel,
  CreateRequestModel,
  Feed,
  Request,
  RequestInfo,
  RequestStatuses,
  RequestTypes,
  UpdateRequestBackendModel,
} from '../../models/request';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FromRequests } from '../store/requests.selectors';
import { RequestTypesService } from '../../core/services/request-types.service';
import { RequestStatusesService } from '../../core/services/request-statuses.service';
import {
  RequestStatus,
  RequestType,
  statusLabelsForUI,
  typeLabelsForUI,
  urgenciesForUI,
} from '../../constants/requsts';
import { omit } from 'lodash';
import { RolesService } from '../../core/services/roles.service';
import { Role } from '../../constants/roles';
import { UsersService } from '../../users/services/users.service';
import { Nullable } from '../../models/core';
import { User } from '../../models/user';
import { ReportsService } from '../../core/services/reports.service';

type DataForRequestInfo = [Request, RequestStatus, RequestType, Role, Role, Role[]];
type DataForRequestInfoStream = [
  Observable<Request>,
  Observable<RequestStatus>,
  Observable<RequestType>,
  Observable<Role>,
  Observable<Role>,
  Observable<Role[]>
];

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly requestTypesService: RequestTypesService,
    private readonly requestStatusesService: RequestStatusesService,
    private readonly rolesService: RolesService,
    private readonly reportsService: ReportsService
  ) {}

  static mapToRequestInfo([
    request,
    status,
    type,
    roleCreatedBy,
    roleAssignedTo,
    rolesFeedsCreatedBy,
  ]: DataForRequestInfo): RequestInfo {
    return {
      ...omit(request, ['statusId', 'typeId']),
      status,
      type,
      createdBy: UsersService.mapToUserInfo([request.createdBy, roleCreatedBy]),
      assignedTo: UsersService.mapToUserInfo([request.assignedTo || ({} as User), roleAssignedTo]),
      feeds: request.feeds.map((feed: Feed, i: number) => ({
        ...feed,
        createdBy: UsersService.mapToUserInfo([feed.createdBy, rolesFeedsCreatedBy[i]]),
      })),
    };
  }

  getAll$(): Observable<Request[]> {
    return this.http.get<Request[]>(`${BASE_API_URL}/requests`).pipe(catchError(() => of([])));
  }

  getAllMine$(): Observable<Request[]> {
    return this.http.get<Request[]>(`${BASE_API_URL}/requests/mine`).pipe(catchError(() => of([])));
  }

  create$(request: CreateRequestBackendModel): Observable<Nullable<Request>> {
    return this.http.post<Request>(`${BASE_API_URL}/requests`, { ...request }).pipe(catchError(() => of(null)));
  }

  update$(request: UpdateRequestBackendModel): Observable<Nullable<Request>> {
    return this.http.put<Request>(`${BASE_API_URL}/requests`, { ...request }).pipe(catchError(() => of(null)));
  }

  delete$(id: string): Observable<string> {
    return this.http.delete<void>(`${BASE_API_URL}/requests/${id}`).pipe(
      switchMap(() => of(id)),
      catchError(() => of(''))
    );
  }

  addFeed$(feed: CreateFeedBackendModel): Observable<Nullable<Request>> {
    return this.http.post<Request>(`${BASE_API_URL}/requests/feeds`, { ...feed }).pipe(catchError(() => of(null)));
  }

  getRequestsInfo$(): Observable<RequestInfo[]> {
    return this.store.select(FromRequests.getRequests).pipe(
      mergeMap((requests) =>
        from(requests).pipe(
          filter((request) => !!request),
          mergeMap((request) => combineLatest(this.getDataForRequestInfo(request))),
          map(RequestsService.mapToRequestInfo),
          toArray()
        )
      )
    );
  }

  getBackendCreateRequestModel(
    request: CreateRequestModel,
    statuses: RequestStatuses,
    types: RequestTypes
  ): CreateRequestBackendModel {
    const statusId: string = statuses[request.status];
    const typeId: string = types[request.type];

    return { ...omit(request, ['status', 'type']), statusId, typeId };
  }

  getBackendUpdateRequestModel(
    request: RequestInfo,
    statuses: RequestStatuses,
    types: RequestTypes
  ): UpdateRequestBackendModel {
    const statusId: string = statuses[request.status];
    const typeId: string = types[request.type];
    const assignedToId: string = request.assignedTo.id;

    return {
      ...omit(request, ['code', 'feeds', 'status', 'type', 'createdAt', 'updatedAt', 'createdBy', 'assignedTo']),
      statusId,
      typeId,
      assignedToId,
    };
  }

  createReport(request: RequestInfo): void {
    const content: string = [
      `Код заявки: ${request.code}`,
      `Тип: ${typeLabelsForUI[request.type]}`,
      `Статус: ${statusLabelsForUI[request.status]}`,
      `Срочность: ${urgenciesForUI.find(({ value }) => value === request.urgency)?.label}`,
      '',
      `Создан клиентом ${request.createdBy.email} (${request.createdBy.profile?.name} ${request.createdBy.profile?.surname})`,
      `Назначен агенту ${request.assignedTo.email || '-'}`,
      '',
      `Создан: ${new Date(request.createdAt).toLocaleString()}`,
      `Обновлен в последний раз: ${new Date(request.updatedAt).toLocaleString()}`,
      '',
      `Общее содержание:`,
      `${request.message}`,
    ].join('\r\n');

    this.reportsService.createReport(`Отчет по заявке #${request.code}`, content);
  }

  private getDataForRequestInfo(request: Request): DataForRequestInfoStream {
    return [
      of(request),
      this.requestStatusesService.getById$(request.statusId),
      this.requestTypesService.getById$(request.typeId),
      this.rolesService.getById$(request.createdBy.roleId),
      this.rolesService.getById$(request.assignedTo?.roleId || 'xxx'),
      from(request.feeds).pipe(
        mergeMap(({ createdBy }) => this.rolesService.getById$(createdBy.roleId)),
        toArray()
      ),
    ];
  }
}

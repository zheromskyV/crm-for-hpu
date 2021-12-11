import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, zip } from 'rxjs';
import { AnalyticsData, AnalyticsFromServerModel } from '../../models/analytics';
import { BASE_API_URL } from '../../constants/api';
import { catchError, map, mergeMap, toArray } from 'rxjs/operators';
import { RequestTypesService } from '../../core/services/request-types.service';
import { RequestStatusesService } from '../../core/services/request-statuses.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(
    private readonly http: HttpClient,
    private readonly requestTypesService: RequestTypesService,
    private readonly requestStatusesService: RequestStatusesService
  ) {}

  getRequestTypesAnalyticsForUser$(): Observable<AnalyticsData[]> {
    return this.getRequestTypesOrStatusesAnalytics$('requestTypesForUser', this.requestTypesService);
  }

  getRequestTypesAnalyticsForAdmin$(): Observable<AnalyticsData[]> {
    return this.getRequestTypesOrStatusesAnalytics$('requestTypesForAdmin', this.requestTypesService);
  }

  getRequestStatusesAnalyticsForUser$(): Observable<AnalyticsData[]> {
    return this.getRequestTypesOrStatusesAnalytics$('requestStatusesForUser', this.requestStatusesService);
  }

  getRequestStatusesAnalyticsForAdmin$(): Observable<AnalyticsData[]> {
    return this.getRequestTypesOrStatusesAnalytics$('requestStatusesForAdmin', this.requestStatusesService);
  }

  getRequestAnalyticsByDayForUser$(): Observable<AnalyticsData[]> {
    return this.getAnalyticsData$('requestsByDayForUser');
  }

  getRequestAnalyticsByDayForAdmin$(): Observable<AnalyticsData[]> {
    return this.getAnalyticsData$('requestsByDayForAdmin');
  }

  private getRequestTypesOrStatusesAnalytics$(
    apiEndpoint: string,
    service: RequestStatusesService | RequestTypesService
  ): Observable<AnalyticsData[]> {
    return this.getAnalyticsData$(apiEndpoint).pipe(
      mergeMap((data: AnalyticsData[]) =>
        from(data).pipe(
          mergeMap(({ value, label }: AnalyticsData) => zip(of(value), service.getById$(label))),
          map(([value, label]) => ({ label, value })),
          toArray()
        )
      )
    );
  }

  private getAnalyticsData$(apiEndpoint: string): Observable<AnalyticsData[]> {
    return this.http.get<AnalyticsFromServerModel>(`${BASE_API_URL}/analytics/${apiEndpoint}`).pipe(
      map(({ data }) => data),
      catchError(() => of([]))
    );
  }
}

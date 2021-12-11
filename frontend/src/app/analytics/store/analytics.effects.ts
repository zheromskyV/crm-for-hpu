import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { AnalyticsActions } from './analytics.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { FromAuth } from '../../auth/store/auth.selectors';
import { AppState } from '../../app.state';
import { AnalyticsService } from '../services/analytics.service';
import { Role } from '../../constants/roles';

@Injectable()
export class AnalyticsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly analyticsService: AnalyticsService
  ) {}

  loadAnalytics: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalyticsActions.loadAnalytics),
      withLatestFrom(this.store.select(FromAuth.getCurrentRole)),
      switchMap(([_, userRole]) =>
        userRole === Role.Admin
          ? zip(
              this.analyticsService.getRequestTypesAnalyticsForAdmin$(),
              this.analyticsService.getRequestStatusesAnalyticsForAdmin$(),
              this.analyticsService.getRequestAnalyticsByDayForAdmin$()
            )
          : zip(
              this.analyticsService.getRequestTypesAnalyticsForUser$(),
              this.analyticsService.getRequestStatusesAnalyticsForUser$(),
              this.analyticsService.getRequestAnalyticsByDayForUser$()
            )
      ),
      switchMap(([requestTypes, requestStatuses, requestsByDay]) => [
        AnalyticsActions.setAnalytics({ requestTypes, requestStatuses, requestsByDay }),
      ])
    )
  );
}

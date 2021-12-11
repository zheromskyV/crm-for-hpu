import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FromAnalytics } from '../../store/analytics.selectors';
import { AnalyticsActions } from '../../store/analytics.actions';
import { Observable } from 'rxjs';
import { AnalyticsData, ChartData } from '../../../models/analytics';
import { map } from 'rxjs/operators';
import { daysOfWeekLabelsForUI, statusLabelsForUI, typeLabelsForUI } from '../../../constants/requsts';
import { FromAuth } from '../../../auth/store/auth.selectors';
import { Role } from '../../../constants/roles';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit, OnDestroy {
  requestTypesAnalytics$!: Observable<ChartData>;
  requestStatusesAnalytics$!: Observable<ChartData>;
  requestByDayAnalytics$!: Observable<ChartData>;
  isAdminView$!: Observable<boolean>;
  feedbackAnalytics$!: Observable<ChartData>;
  averageFeedback$!: Observable<string>;
  assigneeAnalytics$!: Observable<ChartData>;

  private readonly typeLabelsForUI = typeLabelsForUI;
  private readonly statusLabelsForUI = statusLabelsForUI;
  private readonly daysOfWeekLabelsForUI = daysOfWeekLabelsForUI;
  private readonly pieColors = [
    '#FFEC21',
    '#378AFF',
    '#FFA32F',
    '#F54F52',
    '#93F03B',
    '#9552EA',
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
  ];
  private readonly pieOptions = {
    backgroundColor: this.pieColors,
    hoverBackgroundColor: this.pieColors,
  };
  private readonly barOptions = {
    backgroundColor: '#FFA32F',
  };

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAdminView$ = this.store.select(FromAuth.getCurrentRole).pipe(map((role: Role) => role === Role.Admin));

    this.requestTypesAnalytics$ = this.store
      .select(FromAnalytics.getRequestTypesAnalytics)
      .pipe(map((data) => this.mapAnalyticsDataToPieChartData(data, this.typeLabelsForUI)));

    this.requestStatusesAnalytics$ = this.store
      .select(FromAnalytics.getRequestStatusesAnalytics)
      .pipe(map((data) => this.mapAnalyticsDataToPieChartData(data, this.statusLabelsForUI)));

    this.requestByDayAnalytics$ = this.store
      .select(FromAnalytics.getRequestsByDayAnalytics)
      .pipe(
        map((data) => this.mapAnalyticsDataToBarChartData(data, 'Количество запросов', this.daysOfWeekLabelsForUI))
      );

    this.feedbackAnalytics$ = this.store
      .select(FromAnalytics.getFeedbackAnalytics)
      .pipe(map(this.mapFeedbackAnalyticsDataToLineChartData));

    this.averageFeedback$ = this.store.select(FromAnalytics.getFeedbackAnalytics).pipe(
      map(this.getAverageDataValue),
      map((value) => value.toFixed(3))
    );

    this.assigneeAnalytics$ = this.store
      .select(FromAnalytics.getAssigneeAnalytics)
      .pipe(map((data) => this.mapAnalyticsDataToPieChartData(data)));

    this.store.dispatch(AnalyticsActions.loadAnalytics());
  }

  ngOnDestroy(): void {
    this.store.dispatch(AnalyticsActions.clearAnalytics());
  }

  private mapAnalyticsDataToPieChartData(data: AnalyticsData[], labelsMapping?: Record<string, string>): ChartData {
    return {
      labels: data.map(({ label }) => (labelsMapping ? labelsMapping[label] : label)),
      datasets: [
        {
          data: data.map(({ value }) => value),
          ...this.pieOptions,
        },
      ],
    };
  }

  private mapAnalyticsDataToBarChartData(
    data: AnalyticsData[],
    datasetLabel: string,
    labelsMapping: string[]
  ): ChartData {
    return {
      labels: data.map(({ label }) => labelsMapping[+label]),
      datasets: [
        {
          label: datasetLabel,
          data: data.map(({ value }) => value),
          ...this.barOptions,
        },
      ],
    };
  }

  private mapFeedbackAnalyticsDataToLineChartData(data: AnalyticsData[]): ChartData {
    return {
      labels: data.map(({ label }) => label),
      datasets: [
        {
          label: 'Оценки',
          data: data.map(({ value }) => value),
          fill: true,
          borderColor: '#FFA32F',
          backgroundColor: 'rgba(255, 167, 38, 0.15)',
        },
      ],
    };
  }

  private getAverageDataValue(data: AnalyticsData[]): number {
    const sum = data.reduce((accumulator: number, current: AnalyticsData) => accumulator + current.value, 0);

    return sum / data.length;
  }
}

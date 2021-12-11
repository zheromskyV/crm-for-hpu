export interface AnalyticsData {
  label: string;
  value: number;
}

export interface GetAnalyticsDto {
  data: AnalyticsData[];
}

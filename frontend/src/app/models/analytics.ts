export interface AnalyticsData {
  label: string;
  value: number;
}

export interface AnalyticsFromServerModel {
  data: AnalyticsData[];
}

export interface ChartDataSetOptions {
  backgroundColor?: string | string[];
  hoverBackgroundColor?: string | string[];
}

export interface ChartDataSet extends ChartDataSetOptions {
  label?: string;
  data: number[];
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}

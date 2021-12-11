import { AnalyticsData } from '../../models/analytics';

export interface AnalyticsState {
  requestTypes: AnalyticsData[];
  requestStatuses: AnalyticsData[];
  requestsByDay: AnalyticsData[];
}

export const initialAnalyticsState: AnalyticsState = {
  requestTypes: [],
  requestStatuses: [],
  requestsByDay: [],
};

import { AnalyticsData } from '../../models/analytics';

export interface AnalyticsState {
  requestTypes: AnalyticsData[];
  requestStatuses: AnalyticsData[];
  requestsByDay: AnalyticsData[];
  feedback: AnalyticsData[];
  assignee: AnalyticsData[];
}

export const initialAnalyticsState: AnalyticsState = {
  requestTypes: [],
  requestStatuses: [],
  requestsByDay: [],
  feedback: [],
  assignee: [],
};

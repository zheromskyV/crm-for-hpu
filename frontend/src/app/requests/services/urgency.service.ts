import { Injectable } from '@angular/core';
import { RequestType, RequestUrgency } from '../../constants/requsts';
import { inRange } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UrgencyService {
  defineUrgency(
    requestType: RequestType,
    selectedUrgency: RequestUrgency,
    numberOfAffected: number,
    isVipUser: boolean
  ): RequestUrgency {
    switch (requestType) {
      case RequestType.Feature:
        return selectedUrgency;

      case RequestType.Feedback:
        return RequestUrgency.Low;

      case RequestType.Email:
        return RequestUrgency.Medium;

      case RequestType.Incident:
        return isVipUser ? RequestUrgency.Urgent : RequestUrgency.High;

      case RequestType.Bug:
        if (inRange(numberOfAffected, 0, 4)) {
          return RequestUrgency.Low;
        }

        if (inRange(numberOfAffected, 5, 10)) {
          return RequestUrgency.Medium;
        }

        if (inRange(numberOfAffected, 11, 20)) {
          return RequestUrgency.High;
        }

        return RequestUrgency.Urgent;

      default:
        return RequestUrgency.Medium;
    }
  }
}

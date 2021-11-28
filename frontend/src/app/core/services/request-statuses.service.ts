import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FromCore } from '../store/core.selectors';
import { ConfigService } from './config.service';
import { ConfigServiceUser } from '../../models/core';
import { initialRequestStatusesData, RequestStatus } from '../../constants/requsts';
import { RequestStatuses, RequestStatusesConfig } from '../../models/request';

@Injectable({
  providedIn: 'root',
})
export class RequestStatusesService implements ConfigServiceUser {
  constructor(private readonly configService: ConfigService) {}

  public getById$(statusId: string): Observable<RequestStatus> {
    return this.configService.getById$<RequestStatus, RequestStatuses>(
      FromCore.getRequestStatuses,
      statusId,
      RequestStatus.Draft
    );
  }

  public load$(): Observable<RequestStatuses> {
    return this.configService.load$<RequestStatus, RequestStatuses, RequestStatusesConfig>(
      'requests/statuses',
      initialRequestStatusesData,
      'statuses'
    );
  }
}

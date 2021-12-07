import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FromCore } from '../store/core.selectors';
import { ConfigService } from './config.service';
import { ConfigServiceConsumer } from '../../models/core';
import { initialRequestTypesData, RequestType } from '../../constants/requsts';
import { RequestTypes, RequestTypesConfig } from '../../models/request';

@Injectable({
  providedIn: 'root',
})
export class RequestTypesService implements ConfigServiceConsumer {
  constructor(private readonly configService: ConfigService) {}

  public getById$(typeId: string): Observable<RequestType> {
    return this.configService.getById$<RequestType, RequestTypes>(
      FromCore.getRequestTypes,
      typeId,
      RequestType.Incident
    );
  }

  public load$(): Observable<RequestTypes> {
    return this.configService.load$<RequestType, RequestTypes, RequestTypesConfig>(
      'requests/types',
      initialRequestTypesData,
      'types'
    );
  }
}

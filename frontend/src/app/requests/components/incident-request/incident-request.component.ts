import { Component } from '@angular/core';
import { RequestType } from '../../../constants/requsts';

@Component({
  selector: 'app-incident-request',
  templateUrl: './incident-request.component.html',
  styleUrls: ['./incident-request.component.scss'],
})
export class IncidentRequestComponent {
  readonly requestType = RequestType.Incident;
}

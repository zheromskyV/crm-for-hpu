import { Component } from '@angular/core';
import { RequestType } from '../../../constants/requsts';

@Component({
  selector: 'app-bug-request',
  templateUrl: './bug-request.component.html',
  styleUrls: ['./bug-request.component.scss'],
})
export class BugRequestComponent {
  readonly requestType = RequestType.Bug;
}

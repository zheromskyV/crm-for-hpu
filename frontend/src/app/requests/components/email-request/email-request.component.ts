import { Component } from '@angular/core';
import { RequestType } from '../../../constants/requsts';

@Component({
  selector: 'app-email-request',
  templateUrl: './email-request.component.html',
  styleUrls: ['./email-request.component.scss'],
})
export class EmailRequestComponent {
  readonly requestType = RequestType.Email;
}

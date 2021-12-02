import { Component } from '@angular/core';
import { RequestType } from '../../../constants/requsts';

@Component({
  selector: 'app-feedback-request',
  templateUrl: './feedback-request.component.html',
  styleUrls: ['./feedback-request.component.scss'],
})
export class FeedbackRequestComponent {
  readonly requestType = RequestType.Feedback;
}

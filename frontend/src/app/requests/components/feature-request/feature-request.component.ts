import { Component } from '@angular/core';
import { RequestType } from '../../../constants/requsts';

@Component({
  selector: 'app-feature-request',
  templateUrl: './feature-request.component.html',
  styleUrls: ['./feature-request.component.scss'],
})
export class FeatureRequestComponent {
  readonly requestType = RequestType.Feature;
}

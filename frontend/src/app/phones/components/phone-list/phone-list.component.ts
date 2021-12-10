import { Component, Input } from '@angular/core';
import { Phone } from '../../../models/phone';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
})
export class PhoneListComponent {
  @Input() phones: Phone[] = [];
}

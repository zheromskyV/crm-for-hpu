import { Component, EventEmitter, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-request-call',
  templateUrl: './request-call.component.html',
  styleUrls: ['./request-call.component.scss'],
})
export class RequestCallComponent {
  @Output() requestCall = new EventEmitter<string>();

  phone = '';

  readonly icons = {
    phone: PrimeIcons.PHONE,
  };

  submit(): void {
    if (isEmpty(this.phone)) {
      return;
    }

    this.requestCall.emit(this.phone.replace(/[^0-9+]/g, ''));

    this.phone = '';
  }
}

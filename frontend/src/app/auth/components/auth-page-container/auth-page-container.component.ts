import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-page-container',
  templateUrl: './auth-page-container.component.html',
  styleUrls: ['./auth-page-container.component.scss'],
})
export class AuthPageContainerComponent {
  @Input() header = '';
}

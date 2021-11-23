import { Component } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  constructor(private readonly navigationService: NavigationService) {}

  goToHomePage(): void {
    this.navigationService.navigateToHomePage();
  }
}

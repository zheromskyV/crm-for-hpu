import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NavigationLink } from '../../../models/navigation';
import { Router, Event as RouterEvent, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavigationService } from '../../services/navigation.service';
import { AppState } from '../../../app.state';
import { FromAuth } from '../../../auth/store/auth.selectors';
import { navigation } from '../../../constants/navigation';
import { filter, map } from 'rxjs/operators';
import { AuthActions } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  icons = {
    logo: PrimeIcons.SITEMAP,
    signOut: PrimeIcons.SIGN_OUT,
  };

  currentUrl = '';
  navigationLinks: NavigationLink[] = [];

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.subscriptions.add(
      this.store.select(FromAuth.getCurrentRole).subscribe((role) => {
        this.navigationLinks = navigation[role];
      })
    );

    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((event: RouterEvent) => event instanceof NavigationEnd),
          map((event) => (event as NavigationEnd).urlAfterRedirects)
        )
        .subscribe((currentUrl: string) => {
          this.currentUrl = currentUrl;
        })
    );
  }

  getStyleClass(linkUrl: string): string {
    return `nav-link p-button-text p-button-${this.currentUrl.includes(linkUrl) ? 'primary' : 'secondary'}`;
  }

  navigateTo(url: string): void {
    this.navigationService.navigateTo(url);
  }

  logOut(): void {
    this.store.dispatch(AuthActions.logOut());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

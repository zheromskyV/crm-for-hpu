import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FromAuth } from '../../../auth/store/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
})
export class LayoutContainerComponent implements OnInit {
  isNavigationShown$!: Observable<boolean>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.isNavigationShown$ = this.store.select(FromAuth.getUserLoggedIn);
  }
}

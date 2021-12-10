import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Phone } from '../../../models/phone';
import { FromPhones } from '../../store/phones.selectors';
import { PhonesActions } from '../../store/phones.actions';

@Component({
  selector: 'app-call-us-page',
  templateUrl: './call-us-page.component.html',
  styleUrls: ['./call-us-page.component.scss'],
})
export class CallUsPageComponent implements OnInit, OnDestroy {
  phones$!: Observable<Phone[]>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.phones$ = this.store.select(FromPhones.getPhones);

    this.store.dispatch(PhonesActions.loadPhones());
  }

  ngOnDestroy(): void {
    this.store.dispatch(PhonesActions.clearPhones());
  }

  requestCall(phoneNumber: string): void {
    this.store.dispatch(PhonesActions.requestCall({ phoneNumber }));
  }
}

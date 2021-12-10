import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PhonesActions } from './phones.actions';
import { switchMap, tap } from 'rxjs/operators';
import { PhonesService } from '../services/phones.service';
import { Phone } from '../../models/phone';
import { EmailService } from '../../core/services/email.service';

@Injectable()
export class PhonesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly phonesService: PhonesService,
    private readonly emailService: EmailService
  ) {}

  loadArticles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PhonesActions.loadPhones),
      switchMap(() => this.phonesService.getPhones$()),
      switchMap((phones: Phone[]) => [PhonesActions.setPhones({ phones })])
    )
  );

  requestCall$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhonesActions.requestCall),
        tap(({ phoneNumber }) => this.emailService.sendRequestCallEmail(phoneNumber))
      ),
    { dispatch: false }
  );
}

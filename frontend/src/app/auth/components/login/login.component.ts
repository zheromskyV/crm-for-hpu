import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { NavigationService } from '../../../core/services/navigation.service';
import { MIN_PASSWORD_LENGTH } from '../../auth.constants';
import { AuthActions } from '../../store/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  icons = {
    login: PrimeIcons.USER,
    password: PrimeIcons.EYE_SLASH,
    signIn: PrimeIcons.SIGN_IN,
    signUp: PrimeIcons.PLUS,
  };
  formGroup!: FormGroup;
  formFields = {
    login: 'login',
    password: 'password',
  };

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly store: Store<AppState>,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.login]: ['', [Validators.required, Validators.email]],
      [this.formFields.password]: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    });
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  signIn(): void {
    if (!this.isFormValid) {
      return;
    }

    const email = this.getFieldValue(this.formFields.login);
    const password = this.getFieldValue(this.formFields.password);

    this.store.dispatch(AuthActions.logIn({ email, password }));
  }

  register(): void {
    this.navigationService.navigateToRegistrationPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

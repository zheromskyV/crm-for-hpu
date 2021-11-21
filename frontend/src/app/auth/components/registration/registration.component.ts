import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { NavigationService } from '../../../core/services/navigation.service';
import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../../auth.constants';
import { Role, rolesForDropdown } from '../../../constants/roles';
import { CreateUserModel, UserInfo } from '../../../models/user';
import { AuthActions } from '../../store/auth.actions';
import { BirthdayValidator } from '../../../core/validators/birthday.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @Input() isProfilePage = false;
  @Input() isEditable = true;
  @Input() userInfo?: UserInfo;

  @Output() stopEditing = new EventEmitter<void>();

  rolesForDropdown = rolesForDropdown;
  icons = {
    email: PrimeIcons.ENVELOPE,
    password: PrimeIcons.KEY,
    role: PrimeIcons.ANDROID,
    name: PrimeIcons.TAG,
    surname: PrimeIcons.TAGS,
    birthday: PrimeIcons.CALENDAR,
    signUp: PrimeIcons.CHECK,
    back: PrimeIcons.ANGLE_LEFT,
    save: PrimeIcons.CHECK,
    cancel: PrimeIcons.TIMES,
    address: PrimeIcons.BOOK,
  };

  formGroup!: FormGroup;
  formFields = {
    login: 'login',
    password: 'password',
    role: 'role',
    birthday: 'birthday',
    name: 'name',
    surname: 'surname',
    address: 'address',
  };

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly store: Store<AppState>,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const disabled = this.isProfilePage;

    this.formGroup = this.formBuilder.group({
      [this.formFields.login]: [{ value: '', disabled }, [Validators.required, Validators.email]],
      [this.formFields.password]: [
        { value: '', disabled },
        [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)],
      ],
      [this.formFields.role]: [{ value: null, disabled }, [Validators.required]],
      [this.formFields.birthday]: [{ value: null, disabled }, [Validators.required, BirthdayValidator]],
      [this.formFields.name]: ['', [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.surname]: ['', [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
      [this.formFields.address]: ['', [Validators.required]],
    });

    if (this.isProfilePage && this.userInfo) {
      this.prefillData();
    }
  }

  private prefillData(): void {
    const { role, email, profile } = this.userInfo || {};

    this.setFieldValue(this.formFields.login, email);
    this.setFieldValue(this.formFields.password, '');
    this.setFieldValue(this.formFields.role, role);
    this.setFieldValue(this.formFields.birthday, new Date(profile?.birthday || ''));
    this.setFieldValue(this.formFields.name, profile?.name);
    this.setFieldValue(this.formFields.surname, profile?.surname);
    this.setFieldValue(this.formFields.address, profile?.address);
  }

  get isFormValid(): boolean {
    if (this.isProfileSectionVisible) {
      return this.formGroup.valid;
    }

    return this.areFieldsValid([this.formFields.role, this.formFields.login, this.formFields.password]);
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  setFieldValue(field: string, value: any): void {
    this.formGroup.controls[field].setValue(value);
  }

  areFieldsValid(fields: string[]): boolean {
    return fields.every((field: string) => this.formGroup.controls[field].valid);
  }

  get isProfileSectionVisible(): boolean {
    return this.getFieldValue(this.formFields.role) === Role.Client || !!this.userInfo?.profile;
  }

  private register(): void {
    const role: Role = this.getFieldValue(this.formFields.role);
    const user: CreateUserModel = {
      email: this.getFieldValue(this.formFields.login),
      password: this.getFieldValue(this.formFields.password),
      role,
      ...(role === Role.Client && {
        profile: {
          name: this.getFieldValue(this.formFields.name),
          surname: this.getFieldValue(this.formFields.surname),
          birthday: new Date(this.getFieldValue(this.formFields.birthday)),
          address: this.getFieldValue(this.formFields.address),
        },
      }),
    };

    console.log({ user });

    this.store.dispatch(AuthActions.register({ user }));
  }

  private updateUser(): void {
    // const user: User = {
    //   ...this.userInfo!,
    //   name: this.getFieldValue(this.formFields.name),
    //   surname: this.getFieldValue(this.formFields.surname),
    //   profile: {
    //     languages: this.getLanguages(),
    //     info: this.getFieldValue(this.formFields.about) || null,
    //   },
    // };
    //
    // this.stopEditing.emit();
    // this.store.dispatch(AuthActions.updateUser({ user }));
  }

  submit(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isProfilePage ? this.updateUser() : this.register();
  }

  back(): void {
    if (this.isProfilePage) {
      this.prefillData();
      this.stopEditing.emit();
      return;
    }

    this.navigationService.navigateToLoginPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

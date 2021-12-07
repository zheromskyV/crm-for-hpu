import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Nullable } from '../../../models/core';
import { CreateUserModel, UserInfo, UserProfile } from '../../../models/user';
import { PrimeIcons } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { NavigationService } from '../../../core/services/navigation.service';
import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../../auth.constants';
import { BirthdayValidator } from '../../../core/validators/birthday.validator';
import { Role, rolesForDropdown } from '../../../constants/roles';
import { AuthActions } from '../../store/auth.actions';
import { UsersActions } from '../../../users/store/users.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() isProfilePage = false;
  @Input() isEditable = true;
  @Input() userInfo: Nullable<UserInfo> = null;

  @Output() stopEditing = new EventEmitter<void>();

  readonly rolesForDropdown = rolesForDropdown;
  readonly icons = {
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
  readonly formFields = {
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
      [this.formFields.birthday]: [{ value: null }, [Validators.required, BirthdayValidator]],
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

    this.store.dispatch(AuthActions.register({ user }));
  }

  private updateUserProfile(): void {
    const profile: UserProfile = {
      // tslint:disable-next-line:no-non-null-assertion
      ...this.userInfo!.profile!,
      name: this.getFieldValue(this.formFields.name),
      surname: this.getFieldValue(this.formFields.surname),
      birthday: new Date(this.getFieldValue(this.formFields.birthday)),
      address: this.getFieldValue(this.formFields.address),
    };

    this.stopEditing.emit();

    this.store.dispatch(UsersActions.updateProfile({ profile }));
  }

  submit(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isProfilePage ? this.updateUserProfile() : this.register();
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

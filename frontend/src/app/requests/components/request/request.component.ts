import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { MIN_MESSAGE_LENGTH, MIN_SUBJECT_LENGTH } from '../../requests.constants';
import { compact } from 'lodash';
import { RequestStatus, RequestType, RequestUrgency, urgenciesForUI } from '../../../constants/requsts';
import { CreateRequestModel } from '../../../models/request';
import { RequestsActions } from '../../store/requests.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { UrgencyService } from '../../services/urgency.service';
import { UsersService } from '../../../users/services/users.service';
import { Subscription } from 'rxjs';
import { UserInfo } from '../../../models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  @Input() header = '';
  @Input() requestType = RequestType.Incident;
  @Input() hasMessage = true;
  @Input() hasSubject = false;
  @Input() hasMailTo = false;
  @Input() hasLinkedIssueCode = false;
  @Input() hasResearchParticipation = false;
  @Input() hasRating = false;
  @Input() hasNumberOfAffected = false;
  @Input() hasUrgency = false;

  readonly urgenciesForUI = urgenciesForUI;
  readonly icons = {
    mailTo: PrimeIcons.ENVELOPE,
    subject: PrimeIcons.FILE,
    linkedIssueCode: PrimeIcons.LINK,
    increment: PrimeIcons.PLUS,
    decrement: PrimeIcons.MINUS,
    save: PrimeIcons.CHECK,
    draft: PrimeIcons.COPY,
  };

  formGroup!: FormGroup;
  readonly formFields = {
    message: 'message',
    subject: 'subject',
    mailTo: 'mailTo',
    linkedIssueCode: 'linkedIssueCode',
    researchParticipation: 'researchParticipation',
    rating: 'rating',
    numberOfAffected: 'numberOfAffected',
    urgency: 'urgency',
  };

  private isVipUser = false;

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly urgencyService: UrgencyService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.formFields.message]: [
        '',
        compact([this.hasMessage && Validators.required, Validators.minLength(MIN_MESSAGE_LENGTH)]),
      ],
      [this.formFields.subject]: [
        '',
        compact([this.hasSubject && Validators.required, Validators.minLength(MIN_SUBJECT_LENGTH)]),
      ],
      [this.formFields.mailTo]: ['', compact([this.hasMailTo && Validators.required, Validators.email])],
      [this.formFields.linkedIssueCode]: [null],
      [this.formFields.researchParticipation]: [true, compact([this.hasResearchParticipation && Validators.required])],
      [this.formFields.rating]: [0, compact([this.hasRating && Validators.required])],
      [this.formFields.numberOfAffected]: [0, compact([this.hasNumberOfAffected && Validators.required])],
      [this.formFields.urgency]: [null, compact([this.hasUrgency && Validators.required])],
    });

    this.subscriptions.add(
      this.usersService
        .getUserInfo$()
        .pipe(map((userInfo: UserInfo) => !!userInfo.profile?.isVip))
        .subscribe((isVip: boolean) => (this.isVipUser = isVip))
    );
  }

  get isFormValid(): boolean {
    const isRatingValid = this.hasRating ? this.getFieldValue(this.formFields.rating) > 0 : true;

    return this.formGroup.valid && isRatingValid;
  }

  getFieldValue(field: string): any {
    return this.formGroup.controls[field].value;
  }

  save(): void {
    this.submit(RequestStatus.Opened);
  }

  draft(): void {
    this.submit(RequestStatus.Draft);
  }

  private submit(status: RequestStatus): void {
    if (!this.isFormValid) {
      return;
    }

    const numberOfAffected: number = this.getFieldValue(this.formFields.numberOfAffected);
    const urgency: RequestUrgency = this.urgencyService.defineUrgency(
      this.requestType,
      this.getFieldValue(this.formFields.urgency),
      numberOfAffected,
      this.isVipUser
    );

    const request: CreateRequestModel = {
      message: this.getFieldValue(this.formFields.message),
      subject: this.getFieldValue(this.formFields.subject),
      mailTo: this.getFieldValue(this.formFields.mailTo),
      linkedRequestCode: this.getFieldValue(this.formFields.linkedIssueCode),
      researchParticipation: this.getFieldValue(this.formFields.researchParticipation),
      rating: this.getFieldValue(this.formFields.rating),
      type: this.requestType,
      numberOfAffected,
      urgency,
      status,
    };

    this.store.dispatch(RequestsActions.submitRequest({ request }));

    this.formGroup.reset();
  }
}

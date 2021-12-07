import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateFeedBackendModel, FeedInfo, RequestInfo } from '../../../models/request';
import { RequestType, statusLabelsForUI, typeLabelsForUI, urgenciesForUI } from '../../../constants/requsts';
import { PrimeIcons } from 'primeng/api';
import { Role } from '../../../constants/roles';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss'],
})
export class RequestDialogComponent {
  @Input() currentRequestInfo!: RequestInfo;
  @Input() isDialogVisible = false;

  @Output() isDialogVisibleChange = new EventEmitter<boolean>();
  @Output() submitFeed = new EventEmitter<CreateFeedBackendModel>();

  newComment = '';

  readonly icons = {
    client: PrimeIcons.USER,
    system: PrimeIcons.COG,
    addComment: PrimeIcons.CHECK,
    yes: PrimeIcons.CHECK_CIRCLE,
    no: PrimeIcons.TIMES_CIRCLE,
  };

  private readonly urgenciesForUI = urgenciesForUI;
  private readonly typeLabelsForUI = typeLabelsForUI;
  private readonly statusLabelsForUI = statusLabelsForUI;

  get currentStatus(): string {
    return this.statusLabelsForUI[this.currentRequestInfo.status];
  }

  get currentType(): string {
    return this.typeLabelsForUI[this.currentRequestInfo.type];
  }

  get currentUrgency(): string {
    return this.urgenciesForUI.find(({ value }) => value === this.currentRequestInfo.urgency)?.label || '';
  }

  get isEmailType(): boolean {
    return this.currentRequestInfo.type === RequestType.Email;
  }

  get isFeedbackType(): boolean {
    return this.currentRequestInfo.type === RequestType.Feedback;
  }

  get isBugType(): boolean {
    return this.currentRequestInfo.type === RequestType.Bug;
  }

  getFeedIcon({ createdBy }: FeedInfo): string {
    return createdBy.role === Role.Client ? this.icons.client : this.icons.system;
  }

  addComment(): void {
    if (isEmpty(this.newComment)) {
      return;
    }

    this.submitFeed.emit({
      message: this.newComment,
      requestId: this.currentRequestInfo.id,
    });

    this.newComment = '';
  }

  cancel(): void {
    this.isDialogVisibleChange.emit(false);
  }
}

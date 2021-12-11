import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateFeedBackendModel, FeedInfo, RequestInfo } from '../../../models/request';
import {
  RequestStatus,
  RequestType,
  statusLabelsForUI,
  typeLabelsForUI,
  urgenciesForUI,
} from '../../../constants/requsts';
import { PrimeIcons } from 'primeng/api';
import { Role } from '../../../constants/roles';
import { isEmpty } from 'lodash';
import { UserInfo } from '../../../models/user';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss'],
})
export class RequestDialogComponent {
  @Input() currentRequestInfo!: RequestInfo;
  @Input() currentUserInfo!: UserInfo;
  @Input() isDialogVisible = false;

  @Output() isDialogVisibleChange = new EventEmitter<boolean>();
  @Output() submitFeed = new EventEmitter<CreateFeedBackendModel>();
  @Output() updateRequest = new EventEmitter<RequestInfo>();
  @Output() createReport = new EventEmitter<RequestInfo>();
  @Output() deleteRequest = new EventEmitter<string>();

  newComment = '';

  readonly icons = {
    client: PrimeIcons.USER,
    system: PrimeIcons.COG,
    addComment: PrimeIcons.CHECK,
    yes: PrimeIcons.CHECK_CIRCLE,
    no: PrimeIcons.TIMES_CIRCLE,
    move: PrimeIcons.ANGLE_DOUBLE_RIGHT,
    reopen: PrimeIcons.REFRESH,
    report: PrimeIcons.DOWNLOAD,
    delete: PrimeIcons.TRASH,
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

  report(): void {
    this.createReport.emit(this.currentRequestInfo);
  }

  delete(): void {
    this.deleteRequest.emit(this.currentRequestInfo.id);
  }

  get isDeleteShown(): boolean {
    return this.currentUserInfo.role === Role.Admin && this.currentRequestInfo.status === RequestStatus.Closed;
  }

  get isMoveFromDraftToOpenedShown(): boolean {
    return this.currentRequestInfo.status === RequestStatus.Draft && this.currentUserInfo.role === Role.Client;
  }

  moveFromDraftToOpened(): void {
    this.updateRequest.emit({
      ...this.currentRequestInfo,
      status: RequestStatus.Opened,
    });
  }

  get isMoveFromOpenedToInProgressShown(): boolean {
    return (
      this.currentRequestInfo.status === RequestStatus.Opened &&
      this.currentUserInfo.role === Role.Agent &&
      this.isCurrentRequestAssigned
    );
  }

  moveFromOpenedToInProgress(): void {
    this.updateRequest.emit({
      ...this.currentRequestInfo,
      status: RequestStatus.InProgress,
    });
  }

  get isMoveFromInProgressToClosedShown(): boolean {
    return this.currentRequestInfo.status === RequestStatus.InProgress && this.currentUserInfo.role === Role.Agent;
  }

  moveFromInProgressToClosed(): void {
    this.updateRequest.emit({
      ...this.currentRequestInfo,
      status: RequestStatus.Closed,
    });
  }

  get isMoveFromClosedToOpenedShown(): boolean {
    return this.currentRequestInfo.status === RequestStatus.Closed && this.currentUserInfo.role === Role.Client;
  }

  moveFromClosedToOpened(): void {
    this.updateRequest.emit({
      ...this.currentRequestInfo,
      status: RequestStatus.Opened,
    });
  }

  get isAssignToMeShown(): boolean {
    return (
      !this.isCurrentRequestAssigned &&
      this.currentUserInfo.role === Role.Agent &&
      this.currentRequestInfo.status !== RequestStatus.Draft
    );
  }

  assignToMe(): void {
    this.updateRequest.emit({
      ...this.currentRequestInfo,
      assignedTo: this.currentUserInfo,
    });
  }

  private get isCurrentRequestAssigned(): boolean {
    return !isEmpty(this.currentRequestInfo.assignedTo.id);
  }
}

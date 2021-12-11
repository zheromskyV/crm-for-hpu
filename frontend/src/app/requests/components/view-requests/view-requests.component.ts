import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { RequestsActions } from '../../store/requests.actions';
import { CreateFeedBackendModel, RequestInfo } from '../../../models/request';
import { RequestsService } from '../../services/requests.service';
import { Subscription } from 'rxjs';
import { UserInfo } from '../../../models/user';
import { UsersService } from '../../../users/services/users.service';
import { Role } from '../../../constants/roles';
import { RequestStatus } from '../../../constants/requsts';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss'],
})
export class ViewRequestsComponent implements OnInit, OnDestroy {
  requests: RequestInfo[] = [];

  currentRequestId!: string;
  currentRequestInfo!: RequestInfo;
  currentUserInfo!: UserInfo;

  isDialogVisible = false;

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly store: Store<AppState>,
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(RequestsActions.loadAllRequests());

    this.subscriptions.add(
      this.usersService.getUserInfo$().subscribe((userInfo: UserInfo) => {
        this.currentUserInfo = userInfo;
      })
    );

    this.subscriptions.add(
      this.requestsService.getRequestsInfo$().subscribe((requests: RequestInfo[]) => {
        this.requests = requests;
        this.setCurrentRequestInfo();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(RequestsActions.clearRequests());
  }

  get requestsForBoard(): RequestInfo[] {
    const currentId = this.currentUserInfo.id;

    return this.requests.filter(
      ({ assignedTo, createdBy }: RequestInfo) => assignedTo.id === currentId || createdBy.id === currentId
    );
  }

  get requestsForTable(): RequestInfo[] {
    if (this.currentUserInfo.role === Role.Client) {
      return this.requests;
    }

    return this.requests.filter(({ status }: RequestInfo) => status !== RequestStatus.Draft);
  }

  setCurrentRequestInfo(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.currentRequestInfo = this.requests.find(({ id }) => id === this.currentRequestId)!;
  }

  showDialog(requestId: string): void {
    this.currentRequestId = requestId;
    this.setCurrentRequestInfo();
    this.isDialogVisible = true;
  }

  submitFeed(feed: CreateFeedBackendModel): void {
    this.store.dispatch(RequestsActions.submitFeed({ feed }));
  }

  updateRequest(request: RequestInfo): void {
    this.store.dispatch(RequestsActions.updateRequest({ request }));
  }

  createReport(request: RequestInfo): void {
    this.store.dispatch(RequestsActions.createReport({ request }));
  }
}

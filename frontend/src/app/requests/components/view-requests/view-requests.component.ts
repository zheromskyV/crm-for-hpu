import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { RequestsActions } from '../../store/requests.actions';
import { CreateFeedBackendModel, RequestInfo } from '../../../models/request';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss'],
})
export class ViewRequestsComponent implements OnInit, OnDestroy {
  requests: RequestInfo[] = [];

  currentRequestId!: string;
  currentRequestInfo!: RequestInfo;

  isDialogVisible = false;

  constructor(private readonly store: Store<AppState>, private readonly requestsService: RequestsService) {}

  ngOnInit(): void {
    this.store.dispatch(RequestsActions.loadAllRequests());

    this.requestsService.getRequestsInfo$().subscribe((requests: RequestInfo[]) => {
      console.log(requests);
      this.requests = requests;
      this.setCurrentRequestInfo();
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(RequestsActions.clearRequests());
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
}

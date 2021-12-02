import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { RequestsActions } from '../../store/requests.actions';
import { Observable } from 'rxjs';
import { Request } from '../../../models/request';
import { FromRequests } from '../../store/requests.selectors';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.scss'],
})
export class ViewRequestsComponent implements OnInit, OnDestroy {
  requests$!: Observable<Request[]>;

  constructor(private readonly store: Store<AppState>, private readonly requestsService: RequestsService) {}

  ngOnInit(): void {
    this.store.dispatch(RequestsActions.loadAllRequests());

    this.requests$ = this.store.select(FromRequests.getRequests);

    this.requestsService.getRequestsInfo$().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.store.dispatch(RequestsActions.clearRequests());
  }
}

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RequestStatus, typeLabelsForUI } from '../../../constants/requsts';
import { RequestInfo } from '../../../models/request';

@Component({
  selector: 'app-view-requests-board',
  templateUrl: './view-requests-board.component.html',
  styleUrls: ['./view-requests-board.component.scss'],
})
export class ViewRequestsBoardComponent implements OnChanges {
  @Input() requests: RequestInfo[] = [];

  @Output() cardClicked = new EventEmitter<string>();

  private readonly typeLabelsForUI = typeLabelsForUI;

  ngOnChanges(): void {
    this.requests = this.requests.sort((a, b) => a.code - b.code);
  }

  get openedRequests(): RequestInfo[] {
    return this.filterRequestsByStatus(RequestStatus.Opened);
  }

  get inProgressRequests(): RequestInfo[] {
    return this.filterRequestsByStatus(RequestStatus.InProgress);
  }

  get closedRequests(): RequestInfo[] {
    return this.filterRequestsByStatus(RequestStatus.Closed);
  }

  get draftRequests(): RequestInfo[] {
    return this.filterRequestsByStatus(RequestStatus.Draft);
  }

  getType({ type }: RequestInfo): string {
    return this.typeLabelsForUI[type];
  }

  handleCardClick({ id }: RequestInfo): void {
    this.cardClicked.emit(id);
  }

  private filterRequestsByStatus(requestStatus: RequestStatus): RequestInfo[] {
    return this.requests.filter(({ status }) => status === requestStatus);
  }
}

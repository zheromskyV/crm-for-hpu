import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { statusLabelsForUI, typeLabelsForUI } from '../../../constants/requsts';
import { RequestInfo } from '../../../models/request';

@Component({
  selector: 'app-view-requests-table',
  templateUrl: './view-requests-table.component.html',
  styleUrls: ['./view-requests-table.component.scss'],
})
export class ViewRequestsTableComponent implements OnChanges {
  @Input() requests: RequestInfo[] = [];

  @Output() rowClicked = new EventEmitter<string>();

  private readonly typeLabelsForUI = typeLabelsForUI;
  private readonly statusLabelsForUI = statusLabelsForUI;

  ngOnChanges(): void {
    this.requests = this.requests.sort((a, b) => a.code - b.code);
  }

  getStatus({ status }: RequestInfo): string {
    return this.statusLabelsForUI[status];
  }

  getType({ type }: RequestInfo): string {
    return this.typeLabelsForUI[type];
  }

  handleRowClick({ id }: RequestInfo): void {
    this.rowClicked.emit(id);
  }
}

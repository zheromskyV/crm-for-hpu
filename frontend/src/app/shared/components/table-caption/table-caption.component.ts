import { Component, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-table-caption',
  templateUrl: './table-caption.component.html',
  styleUrls: ['./table-caption.component.scss'],
})
export class TableCaptionComponent {
  @Input() table!: Table;

  icons = {
    clearFilters: PrimeIcons.FILTER_SLASH,
    search: PrimeIcons.SEARCH,
  };
}

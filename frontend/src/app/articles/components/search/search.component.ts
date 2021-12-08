import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() query = '';

  @Output() queryChange = new EventEmitter<string>();

  handleQueryChange(changedQuery: string): void {
    this.queryChange.emit(changedQuery);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nullable } from '../../../models/core';
import { Article } from '../../../models/article';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Nullable<Article> = null;

  @Output() createReport = new EventEmitter<Article>();

  readonly icons = {
    report: PrimeIcons.DOWNLOAD,
  };

  report(): void {
    if (this.article) {
      this.createReport.emit(this.article);
    }
  }
}

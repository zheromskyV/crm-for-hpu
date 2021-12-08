import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];

  @Output() articleClicked = new EventEmitter<Article>();

  handleArticleClick(article: Article): void {
    this.articleClicked.emit(article);
  }
}

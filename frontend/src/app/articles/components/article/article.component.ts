import { Component, Input } from '@angular/core';
import { Nullable } from '../../../models/core';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Nullable<Article> = null;
}

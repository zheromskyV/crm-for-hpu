import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FromArticles } from '../../store/articles.selectors';
import { Article } from '../../../models/article';
import { ArticlesActions } from '../../store/articles.actions';
import { isEmpty } from 'lodash';
import { Nullable } from '../../../models/core';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss'],
})
export class ArticlesPageComponent implements OnInit, OnDestroy {
  query = '';
  selectedArticle: Nullable<Article> = null;

  private initialArticles: Article[] = [];

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ArticlesActions.loadArticles());

    this.subscriptions.add(
      this.store.select(FromArticles.getArticles).subscribe((articles: Article[]) => {
        this.initialArticles = articles;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(ArticlesActions.clearArticles());
  }

  get articles(): Article[] {
    if (isEmpty(this.query)) {
      return this.initialArticles;
    }

    return this.initialArticles.filter(({ title }: Article) => title.includes(this.query));
  }

  selectArticle(article: Article): void {
    this.selectedArticle = article;
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticlesActions } from './articles.actions';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../../models/article';

@Injectable()
export class ArticlesEffects {
  constructor(private readonly actions$: Actions, private readonly articlesService: ArticlesService) {}

  loadArticles$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      switchMap(() => this.articlesService.getArticles$()),
      switchMap((articles: Article[]) => [ArticlesActions.setArticles({ articles })])
    )
  );

  createReport$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ArticlesActions.createReport),
        tap(({ article }) => this.articlesService.createReport(article))
      ),
    { dispatch: false }
  );
}

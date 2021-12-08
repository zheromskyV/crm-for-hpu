import { Action, createReducer, on } from '@ngrx/store';
import { ArticlesState, initialArticlesState } from './articles.state';
import { ArticlesActions } from './articles.actions';

const reducer = createReducer(
  initialArticlesState,
  on(ArticlesActions.setArticles, (state, { articles }) => ({
    ...state,
    articles,
  })),
  on(ArticlesActions.clearArticles, (state) => ({
    ...state,
    articles: initialArticlesState.articles,
  }))
);

export function articlesReducer(state: ArticlesState | undefined, action: Action): any {
  return reducer(state, action);
}

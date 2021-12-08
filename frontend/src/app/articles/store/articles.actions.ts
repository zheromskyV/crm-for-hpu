import { createAction, props } from '@ngrx/store';
import { Article } from '../../models/article';

const loadArticles = createAction('[ARTICLES] LOAD_ARTICLES');

const setArticles = createAction('[ARTICLES] SET_ARTICLES', props<{ articles: Article[] }>());

const clearArticles = createAction('[ARTICLES] CLEAR_ARTICLES');

export const ArticlesActions = { loadArticles, setArticles, clearArticles };

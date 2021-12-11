import { createAction, props } from '@ngrx/store';
import { Article } from '../../models/article';

const loadArticles = createAction('[ARTICLES] LOAD_ARTICLES');

const setArticles = createAction('[ARTICLES] SET_ARTICLES', props<{ articles: Article[] }>());

const clearArticles = createAction('[ARTICLES] CLEAR_ARTICLES');

const createReport = createAction('[ARTICLES] CREATE_REPORT', props<{ article: Article }>());

export const ArticlesActions = { loadArticles, setArticles, clearArticles, createReport };

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from './articles.state';
import { StoreFeature } from '../../constants/store.enum';
import { Article } from '../../models/article';

const rootSelector = createFeatureSelector<ArticlesState>(StoreFeature.Articles);

const getArticles = createSelector(rootSelector, (state: ArticlesState): Article[] => state.articles);

export const FromArticles = { getArticles };

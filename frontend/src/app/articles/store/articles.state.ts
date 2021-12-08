import { Article } from '../../models/article';

export interface ArticlesState {
  articles: Article[];
}

export const initialArticlesState: ArticlesState = {
  articles: [],
};

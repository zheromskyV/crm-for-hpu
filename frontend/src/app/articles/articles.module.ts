import { NgModule } from '@angular/core';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SearchComponent } from './components/search/search.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticlesPageComponent } from './components/articles-page/articles-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchComponent, ArticleComponent, ArticleListComponent, ArticlesPageComponent],
  imports: [SharedModule, ArticlesRoutingModule],
})
export class ArticlesModule {}

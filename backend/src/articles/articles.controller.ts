import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { GetArticleDto } from './articles.dto';
import { Article } from './article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getAll(): Promise<GetArticleDto[]> {
    const articles: Article[] = await this.articlesService.getAll();

    return articles.map(this.articlesService.mapToSend.bind(this.articlesService));
  }
}

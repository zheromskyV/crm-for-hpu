import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { GetArticleDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>) {}

  async getAll(): Promise<Article[]> {
    return this.articleRepo.find();
  }

  mapToSend(article: Article): GetArticleDto {
    return article;
  }
}

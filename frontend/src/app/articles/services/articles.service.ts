import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../../models/article';
import { BASE_API_URL } from '../../constants/api';
import { catchError } from 'rxjs/operators';
import { ReportsService } from '../../core/services/reports.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private readonly http: HttpClient, private readonly reportsService: ReportsService) {}

  getArticles$(): Observable<Article[]> {
    return this.http.get<Article[]>(`${BASE_API_URL}/articles`).pipe(catchError(() => of([])));
  }

  createReport(article: Article): void {
    const content: string = [`${article.title}`, '', `${article.summary}`, '', `${article.body}`].join('\r\n');

    this.reportsService.createReport(`Статья "${article.title}"`, content);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from '../../models/article';
import { BASE_API_URL } from '../../constants/api';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private readonly http: HttpClient) {}

  getArticles$(): Observable<Article[]> {
    return this.http.get<Article[]>(`${BASE_API_URL}/articles`).pipe(catchError(() => of([])));
  }
}

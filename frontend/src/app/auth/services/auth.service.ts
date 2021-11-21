import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BASE_API_URL } from '../../constants/api';
import { StorageService } from '../../core/services/storage.service';
import { JwtToken } from '../../models/auth';
import { catchError } from 'rxjs/operators';
import { CreateUserBackendModel } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenStorageKey = 'jwt-token';

  constructor(private readonly http: HttpClient, private readonly storageService: StorageService) {}

  login(email: string, password: string): Observable<JwtToken> {
    return this.http
      .post<JwtToken>(`${BASE_API_URL}/auth/login`, { email, password })
      .pipe(catchError(() => of({ token: '' })));
  }

  register(user: CreateUserBackendModel): Observable<JwtToken> {
    return this.http
      .post<JwtToken>(`${BASE_API_URL}/auth/register`, { ...user })
      .pipe(catchError(() => of({ token: '' })));
  }

  saveToken(token: string): void {
    this.storageService.setItem(this.tokenStorageKey, token);
  }

  getToken(): string {
    return this.storageService.getItem<string>(this.tokenStorageKey) || '';
  }

  clearToken(): void {
    this.storageService.removeItem(this.tokenStorageKey);
  }
}

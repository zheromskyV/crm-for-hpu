import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BASE_API_URL } from '../../constants/api';
import { catchError } from 'rxjs/operators';
import { Phone } from '../../models/phone';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {
  constructor(private readonly http: HttpClient) {}

  getPhones$(): Observable<Phone[]> {
    return this.http.get<Phone[]>(`${BASE_API_URL}/phones`).pipe(catchError(() => of([])));
  }
}

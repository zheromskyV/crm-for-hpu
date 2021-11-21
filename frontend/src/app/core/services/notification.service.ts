import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Notification } from '../../models/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject = new ReplaySubject<Notification>(1);

  success(message: string): void {
    this.notificationSubject.next({
      severity: 'success',
      summary: 'Успех!',
      detail: message,
    });
  }

  error(message: string): void {
    this.notificationSubject.next({
      severity: 'error',
      summary: 'Ошибка!',
      detail: message,
    });
  }

  get notifications$(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../constants/api';
import { NotificationService } from './notification.service';
import { PartialObserver } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly stdEmailObserver: PartialObserver<void>;

  constructor(private readonly http: HttpClient, private readonly notificationService: NotificationService) {
    this.stdEmailObserver = {
      next: () => this.notificationService.success('Email отправлен успешно'),
      error: () => this.notificationService.error('Ошибка при отправки email'),
    };
  }

  sendRequestCallEmail(phoneNumber: string): void {
    this.http.post<void>(`${BASE_API_URL}/email/requestCall`, { phoneNumber }).subscribe(this.stdEmailObserver);
  }

  sendNotifyAgentEmail(agentEmail: string = '', requestSubject: string = ''): void {
    this.http
      .post<void>(`${BASE_API_URL}/email/notifyAgent`, { agentEmail, requestSubject })
      .subscribe(this.stdEmailObserver);
  }
}

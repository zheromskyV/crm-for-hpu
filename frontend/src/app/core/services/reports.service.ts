import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly notificationService: NotificationService
  ) {}

  createReport(title: string, content: string): void {
    const link: HTMLAnchorElement = this.document.createElement('a');

    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    link.setAttribute('download', `${title} (${new Date().toLocaleString()}).txt`);
    link.style.display = 'none';

    document.body.appendChild(link);

    link.click();

    this.notificationService.success(`Отчет "${title}" создан`);
  }
}

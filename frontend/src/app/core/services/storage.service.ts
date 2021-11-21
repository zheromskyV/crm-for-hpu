import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = '[CRM-FOR-HPU]';

  getItem<T>(key: string): T | null {
    const data: string = localStorage.getItem(this.getKey(key)) ?? '';

    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  setItem(key: string, data: unknown): void {
    localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  private getKey(key: string): string {
    return `${this.storageKey} ${key}`;
  }
}

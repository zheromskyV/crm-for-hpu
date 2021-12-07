import { Message } from 'primeng/api';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface Notification extends Message {}

export type Config = {
  title: string;
  key: string;
}[];

export type Nullable<T> = T | null | undefined;

export interface ConfigServiceConsumer {
  getById$(id: string): Observable<unknown>;
  load$(): Observable<unknown>;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BASE_API_URL } from '../../constants/api';
import { catchError, map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { Config } from '../../models/core';
import { MemoizedSelector, Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private readonly http: HttpClient, private readonly store: Store<AppState>) {}

  public getById$<Enum, SelectorResult>(
    selector: MemoizedSelector<object, SelectorResult>,
    id: string,
    fallback: Enum
  ): Observable<Enum> {
    return this.store.select(selector).pipe(
      map((selectedData: SelectorResult) => {
        for (const [key, value] of Object.entries(selectedData)) {
          if (value === id) {
            return key as unknown as Enum;
          }
        }

        return fallback;
      })
    );
  }

  // @ts-ignore
  public load$<Enum, ResultData extends Record<Enum, string>, ConfigType>(
    url: string,
    initialData: ResultData,
    configKey: keyof ConfigType
  ): Observable<ResultData> {
    return this.http.get<ConfigType>(`${BASE_API_URL}/${url}`).pipe(
      map((config) => {
        const data: ResultData = cloneDeep(initialData);
        const configData = config[configKey] as unknown as Config;

        Object.keys(data).forEach((key) => {
          // @ts-ignore
          data[key as Enum] = configData.find(({ title }) => title === key)?.key || '';
        });

        return data;
      }),
      catchError(() => of(initialData))
    );
  }
}

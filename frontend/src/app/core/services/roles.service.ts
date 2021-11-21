import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../constants/api';
import { Roles, RolesConfig } from '../../models/roles';
import { initialRolesData, Role } from '../../constants/roles';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FromCore } from '../store/core.selectors';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private readonly http: HttpClient, private readonly store: Store<AppState>) {}

  public getRoleById(roleId: string): Observable<Role> {
    return this.store.select(FromCore.getRoles).pipe(
      map((roles: Roles) => {
        for (const [key, value] of Object.entries(roles)) {
          if (value === roleId) {
            return key as Role;
          }
        }

        return Role.Client;
      })
    );
  }

  public loadRoles(): Observable<Roles> {
    return this.http.get<RolesConfig>(`${BASE_API_URL}/roles`).pipe(
      map(({ roles }) => {
        const rolesData: Roles = cloneDeep(initialRolesData);

        Object.keys(rolesData).forEach((key) => {
          rolesData[key as Role] = roles.find(({ title }) => title === key)?.key || '';
        });

        return rolesData;
      }),
      catchError(() => of(initialRolesData))
    );
  }
}

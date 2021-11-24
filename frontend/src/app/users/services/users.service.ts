import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../constants/api';
import { CreateUserBackendModel, CreateUserModel, User, UserInfo, UserProfile } from '../../models/user';
import { Observable, of, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Roles } from '../../models/roles';
import { omit } from 'lodash';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { FromAuth } from '../../auth/store/auth.selectors';
import { RolesService } from '../../core/services/roles.service';
import { Role } from '../../constants/roles';
import { Nullable } from '../../models/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly rolesService: RolesService
  ) {}

  getMe$(): Observable<Nullable<User>> {
    return this.http.get<User>(`${BASE_API_URL}/users/me`).pipe(catchError(() => of(null)));
  }

  updateProfile$(profile: UserProfile): Observable<Nullable<UserProfile>> {
    return this.http.put<UserProfile>(`${BASE_API_URL}/users/profile`, profile).pipe(catchError(() => of(null)));
  }

  getBackendCreateUserModel(createUserModel: CreateUserModel, roles: Roles): CreateUserBackendModel {
    const roleId: string = roles[createUserModel.role];

    return { ...omit(createUserModel, ['role']), roleId };
  }

  getUserInfo$(): Observable<UserInfo> {
    return this.store.select(FromAuth.getCurrentUser).pipe(
      switchMap((user: User) => zip(of(user), this.rolesService.getRoleById$(user.roleId))),
      map(([user, role]: [User, Role]) => ({ ...omit(user, ['roleId']), role }))
    );
  }
}

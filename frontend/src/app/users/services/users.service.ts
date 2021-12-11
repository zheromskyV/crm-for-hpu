import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../constants/api';
import { CreateUserBackendModel, CreateUserModel, User, UserInfo, UserProfile } from '../../models/user';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
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

  static mapToUserInfo([user, role]: [User, Role]): UserInfo {
    return { ...omit(user, ['roleId']), role };
  }

  getAll$(): Observable<UserInfo[]> {
    return this.http.get<User[]>(`${BASE_API_URL}/users`).pipe(
      mergeMap((users: User[]) =>
        from(users).pipe(
          mergeMap((user: User) => zip(of(user), this.rolesService.getById$(user.roleId))),
          map(UsersService.mapToUserInfo),
          toArray()
        )
      ),
      catchError(() => of([]))
    );
  }

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
      switchMap((user: User) => zip(of(user), this.rolesService.getById$(user.roleId))),
      map(UsersService.mapToUserInfo)
    );
  }
}

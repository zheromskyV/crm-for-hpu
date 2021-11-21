import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../constants/api';
import { CreateUserBackendModel, CreateUserModel, User } from '../../models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Roles } from '../../models/roles';
import { omit } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getMe(): Observable<User | null> {
    return this.http.get<User>(`${BASE_API_URL}/users/me`).pipe(catchError(() => of(null)));
  }

  getBackendCreateUserModel(createUserModel: CreateUserModel, roles: Roles): CreateUserBackendModel {
    const roleId: string = roles[createUserModel.role];

    return { ...omit(createUserModel, ['role']), roleId };
  }
}

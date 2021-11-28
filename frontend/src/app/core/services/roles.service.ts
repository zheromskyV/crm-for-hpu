import { Injectable } from '@angular/core';
import { Roles, RolesConfig } from '../../models/roles';
import { initialRolesData, Role } from '../../constants/roles';
import { Observable } from 'rxjs';
import { FromCore } from '../store/core.selectors';
import { ConfigService } from './config.service';
import { ConfigServiceUser } from '../../models/core';

@Injectable({
  providedIn: 'root',
})
export class RolesService implements ConfigServiceUser {
  constructor(private readonly configService: ConfigService) {}

  public getById$(roleId: string): Observable<Role> {
    return this.configService.getById$<Role, Roles>(FromCore.getRoles, roleId, Role.Client);
  }

  public load$(): Observable<Roles> {
    return this.configService.load$<Role, Roles, RolesConfig>('users/roles', initialRolesData, 'roles');
  }
}

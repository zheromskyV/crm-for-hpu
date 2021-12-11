import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfo, UserProfile } from '../../../models/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { UsersActions } from '../../store/users.actions';
import { FromUsers } from '../../store/users.selector';
import { PrimeIcons } from 'primeng/api';
import { Role, rolesForUI } from '../../../constants/roles';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit, OnDestroy {
  users: UserInfo[] = [];

  public readonly icons = {
    expand: PrimeIcons.CHEVRON_RIGHT,
    collapse: PrimeIcons.CHEVRON_DOWN,
    vip: PrimeIcons.STAR,
    makeVip: PrimeIcons.STAR_O,
  };

  private readonly subscriptions = new Subscription();

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());

    this.subscriptions.add(
      this.store.select(FromUsers.getUsers).subscribe((users) => {
        this.users = users;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(UsersActions.clearUsers());
  }

  isRowExpandableForUser(user: UserInfo): boolean {
    return user.role === Role.Client;
  }

  getUserRoleForUI(user: UserInfo): string {
    return rolesForUI[user.role];
  }

  makeVip(user: UserInfo): void {
    const profile: UserProfile = {
      // tslint:disable-next-line:no-non-null-assertion
      ...user.profile!,
      isVip: true,
    };

    this.store.dispatch(UsersActions.updateProfile({ profile }));
  }
}

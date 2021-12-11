import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../models/user';
import { Observable } from 'rxjs';
import { PrimeIcons } from 'primeng/api';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  readonly icons = {
    edit: PrimeIcons.PENCIL,
    vip: PrimeIcons.STAR,
  };

  userInfo$!: Observable<UserInfo>;
  isEditable = false;

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.userInfo$ = this.usersService.getUserInfo$();
  }

  startEditing(): void {
    this.isEditable = true;
  }

  stopEditing(): void {
    this.isEditable = false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserInfoService} from "../service/userInfo.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userInfo: UserInfoService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.userInfo.token) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

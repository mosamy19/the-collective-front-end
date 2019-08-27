import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate() {
    if (!this.loginService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}

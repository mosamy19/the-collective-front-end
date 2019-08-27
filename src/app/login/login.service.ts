import { Injectable } from "@angular/core";
import { baseURL } from "../shared/baseurl";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { Observable } from "rxjs";
const URL = baseURL + "auth/";
export const TOKEN_NAME: string = "token";

import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    console.log(token);
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user): Observable<any> {
    console.log(user);
    return this.http.post(URL, user, { responseType: "text" }).pipe(
      map(data => data),
      tap(data => data, error => error)
    );
  }
}

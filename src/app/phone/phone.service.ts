import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PhoneService {
  constructor(private http: HttpClient) {}

  getPhoneCodes(): Observable<any> {
    let URL = "./codes.json";
    return this.http.get(URL).pipe(
      map(data => data as any),
      tap(data => data, error => error)
    );
  }
}

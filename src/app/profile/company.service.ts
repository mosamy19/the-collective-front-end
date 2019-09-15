import { Injectable } from "@angular/core";
import { baseURL } from "./../shared/baseurl";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { CompanyModel } from "./company.module";

const URL = baseURL + "company/";
@Injectable({
  providedIn: "root"
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getSeachResult(query: string): Observable<CompanyModel[]> {
    let _URL = URL + "search/" + query;
    return this.http.get(_URL).pipe(
      map(data => data as CompanyModel[]),
      tap(data => data, error => error)
    );
  }

  addNewCompany(company: CompanyModel, userId): Observable<CompanyModel> {
    let _URL = URL + userId;
    return this.http.post(_URL, company).pipe(
      map(data => data as CompanyModel),
      tap(data => data, error => error)
    );
  }
}

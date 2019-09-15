import { Injectable } from "@angular/core";
import { baseURL } from "../shared/baseurl";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { SuperpowerWeaknessModel } from "../common/superpower-weakness.module";
const URL = baseURL + "superpower/";

@Injectable({
  providedIn: "root"
})
export class SuperpowerService {
  constructor(private http: HttpClient) {}

  getSeachResult(query: string): Observable<SuperpowerWeaknessModel[]> {
    let _URL = URL + "search/" + query;
    return this.http.get(_URL).pipe(
      map(data => data as SuperpowerWeaknessModel[]),
      tap(data => data, error => error)
    );
  }

  addNewSuperpower(
    superpower: SuperpowerWeaknessModel
  ): Observable<SuperpowerWeaknessModel> {
    return this.http.post(URL, superpower).pipe(
      map(data => data as SuperpowerWeaknessModel),
      tap(data => data, error => error)
    );
  }
}

import { Injectable } from "@angular/core";
import { baseURL } from "../shared/baseurl";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { SuperpowerWeaknessModel } from "../common/superpower-weakness.module";
const URL = baseURL + "weakness/";

@Injectable({
  providedIn: "root"
})
export class WeaknessService {
  constructor(private http: HttpClient) {}

  getSeachResult(query: string): Observable<SuperpowerWeaknessModel[]> {
    let _URL = URL + "search/" + query;
    return this.http.get(_URL).pipe(
      map(data => data as SuperpowerWeaknessModel[]),
      tap(data => data, error => error)
    );
  }

  addNewWeakness(
    weakness: SuperpowerWeaknessModel
  ): Observable<SuperpowerWeaknessModel> {
    return this.http.post(URL, weakness).pipe(
      map(data => data as SuperpowerWeaknessModel),
      tap(data => data, error => error)
    );
  }
}

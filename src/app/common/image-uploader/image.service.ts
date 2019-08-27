import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "src/app/shared/baseurl";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
const URL = baseURL + "upload";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImg(formData): Observable<any> {
    return this.http.post(URL, formData).pipe(
      map(data => data as string),
      tap(data => data, error => error)
    );
  }
}

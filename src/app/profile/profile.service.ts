import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "src/app/shared/baseurl";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  ProfileModel,
  SuperpowerModel,
  WeaknessModel,
  NoteModel
} from "./profile.model";
const URL = baseURL + "profile/";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  PostProfile(userData): Observable<ProfileModel> {
    return this.http.post(URL, userData).pipe(
      map(data => data as ProfileModel),
      tap(data => data, error => error)
    );
  }

  EditProfile(userData, userId): Observable<ProfileModel> {
    let _URL = URL + "update-profile/" + userId;
    return this.http.put(_URL, userData).pipe(
      map(data => data as ProfileModel),
      tap(data => data, error => error)
    );
  }

  updateSocialmedia(userData, userId): Observable<ProfileModel> {
    let _URL = URL + "update-socail-media/" + userId;
    return this.http.put(_URL, userData).pipe(
      map(data => data as ProfileModel),
      tap(data => data, error => error)
    );
  }

  getProfile(userId): Observable<ProfileModel> {
    let userIdURL = URL + userId;
    return this.http.get(userIdURL).pipe(
      map(data => data as ProfileModel),
      tap(data => data, error => error)
    );
  }

  getProfileList(): Observable<ProfileModel[]> {
    let _URL = URL + "list";
    return this.http.get(_URL).pipe(
      map(data => data as ProfileModel[]),
      tap(data => data, error => error)
    );
  }

  addSuperpower(data, userId): Observable<SuperpowerModel> {
    let _URL = URL + "add-superpower/" + userId;
    return this.http.put(_URL, data).pipe(
      map(data => data as SuperpowerModel),
      tap(data => data, error => error)
    );
  }

  addWeekness(data, userId): Observable<WeaknessModel> {
    let _URL = URL + "add-weakness/" + userId;
    return this.http.put(_URL, data).pipe(
      map(data => data as WeaknessModel),
      tap(data => data, error => error)
    );
  }

  removeWeekness(profileId, charId): Observable<WeaknessModel> {
    let _URL = URL + "delete-weakness/" + profileId + "/" + charId;
    return this.http.delete(_URL).pipe(
      map(data => data as WeaknessModel),
      tap(data => data, error => error)
    );
  }

  removeSuperpower(profileId, charId): Observable<SuperpowerModel> {
    let _URL = URL + "delete-superpower/" + profileId + "/" + charId;
    return this.http.delete(_URL).pipe(
      map(data => data as SuperpowerModel),
      tap(data => data, error => error)
    );
  }

  getNotes(profileId): Observable<NoteModel[]> {
    let _URL = baseURL + "notes/" + profileId;
    return this.http.get(_URL).pipe(
      map(data => data as NoteModel[]),
      tap(data => data, error => error)
    );
  }

  getSeachResult(query: string): Observable<ProfileModel[]> {
    let _URL = URL + "search/" + query;
    return this.http.get(_URL).pipe(
      map(data => data as ProfileModel[]),
      tap(data => data, error => error)
    );
  }

  postNote(profileId, data): Observable<NoteModel> {
    let _URL = baseURL + "notes/" + profileId;
    return this.http.post(_URL, data).pipe(
      map(data => data as NoteModel),
      tap(data => data, error => error)
    );
  }

  deleteNote(noteId): Observable<any> {
    let _URL = baseURL + "notes/" + noteId;
    return this.http.delete(_URL).pipe(
      map(data => data as any),
      tap(data => data, error => error)
    );
  }
}

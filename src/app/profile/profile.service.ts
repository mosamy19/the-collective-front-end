import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "src/app/shared/baseurl";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ProfileModel, NoteModel } from "./profile.model";
import { ProfileListModel } from "./profile-list.model";
import { SuperpowerWeaknessModel } from "../common/superpower-weakness.module";
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

  getProfileList(pageNumber, sorting): Observable<ProfileListModel> {
    let _URL = URL + `list/${pageNumber}/${sorting}`;
    return this.http.get(_URL).pipe(
      map(data => data as ProfileListModel),
      tap(data => data, error => error)
    );
  }

  getSearchProfileList(
    query,
    pageNumber,
    sorting
  ): Observable<ProfileListModel> {
    let _URL =
      URL + `search-by-name-and-superpower/${query}/${pageNumber}/${sorting}`;
    return this.http.get(_URL).pipe(
      map(data => data as ProfileListModel),
      tap(data => data, error => error)
    );
  }

  addSuperpower(data, userId): Observable<SuperpowerWeaknessModel> {
    let _URL = URL + "add-superpower/" + userId;
    return this.http.put(_URL, data).pipe(
      map(data => data as SuperpowerWeaknessModel),
      tap(data => data, error => error)
    );
  }

  addWeekness(data, userId): Observable<SuperpowerWeaknessModel> {
    let _URL = URL + "add-weakness/" + userId;
    return this.http.put(_URL, data).pipe(
      map(data => data as SuperpowerWeaknessModel),
      tap(data => data, error => error)
    );
  }

  removeWeekness(profileId, charId): Observable<SuperpowerWeaknessModel> {
    let _URL = URL + "delete-weakness/" + profileId + "/" + charId;
    return this.http.delete(_URL).pipe(
      map(data => data as SuperpowerWeaknessModel),
      tap(data => data, error => error)
    );
  }

  removeSuperpower(profileId, charId): Observable<SuperpowerWeaknessModel> {
    let _URL = URL + "delete-superpower/" + profileId + "/" + charId;
    return this.http.delete(_URL).pipe(
      map(data => data as SuperpowerWeaknessModel),
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

  deleteCompany(profileId, companyId): Observable<boolean> {
    let _URL = `${URL}delete-company/${profileId}/${companyId}`;
    return this.http.delete(_URL).pipe(
      map(data => data as boolean),
      tap(data => data, error => error)
    );
  }

  toggleStar(profileId, star): Observable<boolean> {
    let _URL = URL + "star-profile/" + profileId;
    return this.http.put(_URL, star).pipe(
      map(data => data as boolean),
      tap(data => data, error => error)
    );
  }

  deleteProfile(profileId): Observable<boolean> {
    let _URL = URL + "/" + profileId;
    return this.http.delete(_URL).pipe(
      map(data => data as boolean),
      tap(data => data, error => error)
    );
  }
}

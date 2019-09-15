import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ProfileService } from "../profile.service";
import { ProfileModel } from "../profile.model";
import { baseURL } from "src/app/shared/baseurl";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-search",
  templateUrl: "./profile-search.component.html",
  styleUrls: ["./profile-search.component.scss"]
})
export class ProfileSearchComponent implements OnInit {
  filteredProfiles: ProfileModel[];
  imgBaseUrl = baseURL + "uploads/";
  query: string = "";
  recentSearch: ProfileModel[];
  // @ViewChild("searchInputEl", { static: false })
  // public searchInputEl: ElementRef<HTMLElement>;

  constructor(private profileService: ProfileService, private router: Router) {
    this.filteredProfiles = [];
    this.recentSearch = [];
  }

  ngOnInit() {
    this.getRecentSearches();
  }

  getSearchUsers(query) {
    if (query) {
      this.profileService
        .getSeachResult(query)
        .subscribe(data => (this.filteredProfiles = data));
    } else {
      this.filteredProfiles = [];
    }
  }

  onSearchSelection(e, profile: ProfileModel) {
    const { _id, name, location, profileImg } = profile;
    if (e.source.selected) {
      let _profile = { _id, name, location, profileImg };
      this.AddLocalStorageItem(_profile);
      // this.searchInputEl.nativeElement.blur();
      this.router.navigate(["/profile/view", _id]);
    }
  }

  AddLocalStorageItem(profile) {
    let profileSearches;
    if (localStorage) {
      localStorage["profileSearches"]
        ? (profileSearches = JSON.parse(localStorage["profileSearches"]))
        : (profileSearches = []);
      if (profileSearches.findIndex(i => i._id === profile._id) == -1) {
        profileSearches.unshift(profile);
        if (profileSearches.length > 5) {
          profileSearches.pop();
        }
        localStorage["profileSearches"] = JSON.stringify(profileSearches);
      }
      this.getRecentSearches();
    }
  }

  getRecentSearches() {
    let recentSearches;
    if (localStorage) {
      localStorage["profileSearches"]
        ? (recentSearches = JSON.parse(localStorage["profileSearches"]))
        : (recentSearches = []);
      this.recentSearch = recentSearches;
    }
  }
}

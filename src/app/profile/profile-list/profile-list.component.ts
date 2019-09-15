import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { ProfileModel } from "../profile.model";
import { MatDialog } from "@angular/material/dialog";
import { baseURL } from "src/app/shared/baseurl";
import { ProfileListModel } from "../profile-list.model";
import * as _ from "lodash";
import { AddProfileDialog } from "../add-profile/AddProfileDialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-list",
  templateUrl: "./profile-list.component.html",
  styleUrls: ["./profile-list.component.scss"]
})
export class ProfileListComponent implements OnInit {
  profiles: ProfileModel[] = [];
  pages = [];
  imgBaseUrl = baseURL + "uploads/";
  isLoaded: boolean = false;
  currentPage: number = 1;
  sorting: number = 1;
  isSearch: boolean = false;
  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfiles(this.currentPage, this.sorting);
  }

  getProfiles(pageNumber, sorting) {
    this.profileService.getProfileList(pageNumber, sorting).subscribe(data => {
      this.isSearch = false;
      let _data = data as ProfileListModel;
      this.pages = _.range(1, _data.pages + 1);
      this.profiles = _data.profiles;
      this.isLoaded = true;
    });
  }

  getSearchList(query, pageNumber, sorting) {
    this.profileService
      .getSearchProfileList(query, pageNumber, sorting)
      .subscribe(data => {
        this.isSearch = true;
        let _data = data as ProfileListModel;
        this.pages = _.range(1, _data.pages + 1);
        this.profiles = _data.profiles;
        this.isLoaded = true;
      });
  }

  changeListPage(pageNum) {
    this.isLoaded = false;
    this.currentPage = pageNum;
    this.getProfiles(this.currentPage, this.sorting);
  }

  changeSorting(isName) {
    if (isName) {
      if (this.sorting == 1) {
        this.sorting = 2;
      } else if (this.sorting == 2) {
        this.sorting = 3;
      } else if (this.sorting == 3) {
        this.sorting = 1;
      } else {
        this.sorting = 1;
      }
    } else {
      this.sorting = 4;
    }
    this.currentPage = 1;
    this.getProfiles(this.currentPage, this.sorting);
  }

  onSearch(e) {
    this.isLoaded = false;
    let query = e;
    this.currentPage = 1;
    this.sorting = 1;
    if (query) {
      this.getSearchList(query, this.currentPage, this.sorting);
    } else {
      this.getProfiles(this.currentPage, this.sorting);
    }
  }

  goToProfiles() {
    this.currentPage = 1;
    this.sorting = 1;
    this.getProfiles(this.currentPage, this.sorting);
  }
  toggleStar(profile: ProfileModel) {
    let _star = !profile.star;
    this.profileService.toggleStar(profile._id, _star).subscribe(data => {
      if (data) profile.star = _star;
    });
  }

  deleteUser(id) {
    this.profileService.deleteProfile(id).subscribe(data => {
      if (data) {
        this.profiles = this.profiles.filter(profile => profile._id != id);
      }
    });
  }
  onAddExpret(): void {
    const dialogRef = this.dialog.open(AddProfileDialog, {
      data: {
        name: "",
        phone: { value: "", isPrimary: true },
        email: { value: "", isPrimary: true },
        superpowers: [],
        weaknesses: [],
        profileImg: ""
      },
      width: "560px",
      maxHeight: "98vh"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const {
          name,
          phone,
          email,
          superpowers,
          weaknesses,
          profileImg
        } = result;
        let _data = {
          name,
          phones: [phone],
          emails: [email],
          superpowers,
          weaknesses,
          profileImg
        };
        this.profileService.PostProfile(_data).subscribe(data => {
          if (data) {
            this.router.navigate(["/profile/view", data]);
          }
        });
      }
    });
  }
}

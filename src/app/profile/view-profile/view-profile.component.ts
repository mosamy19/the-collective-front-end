import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProfileService } from "../profile.service";
import { ProfileModel, NoteModel } from "../profile.model";
import { baseURL } from "src/app/shared/baseurl";
import { MatDialog } from "@angular/material/dialog";
import { AddNotesDialog } from "./AddNotesDialog";
import { SocailMediaDialog } from "./SocailMediaDialog";
import { SuperpowerWeaknessModel } from "src/app/common/superpower-weakness.module";

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.scss"]
})
export class ViewProfileComponent implements OnInit {
  userId: string = "";
  profile: ProfileModel;
  imgBaseUrl = baseURL + "uploads/";
  isLoaded: boolean = false;
  superpowerInput: string = "";
  enterSuperpower: boolean = false;
  weeknessInput: string = "";
  enterWeekness: boolean = false;
  searchForCompany: boolean = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.getRouteParams();
  }

  ngOnInit() {}

  getRouteParams() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params["profileId"];
      this.getProfile(this.userId);
    });
  }

  getProfile(id: string) {
    this.profileService.getProfile(id).subscribe(data => {
      console.log(data);
      this.profile = data;
      this.sortPrimaryEl(this.profile.emails);
      this.sortPrimaryEl(this.profile.phones);
      this.getNotes(this.userId);
    });
  }

  getNotes(id: string) {
    this.profileService.getNotes(id).subscribe(data => {
      this.profile.notes = data as NoteModel[];
      this.isLoaded = true;
    });
  }

  onCompanySearch(e) {
    this.searchForCompany = !this.searchForCompany;
  }

  sortPrimaryEl(array) {
    array.sort(function(a, b) {
      return a.isPrimary.value === b.isPrimary.value
        ? 0
        : a.controls.isPrimary.value
        ? -1
        : 1;
    });
  }

  addWeekness() {
    let data = { name: this.weeknessInput };
    this.profileService.addWeekness(data, this.userId).subscribe(data => {
      this.profile.weaknesses.push(data as SuperpowerWeaknessModel);
      this.weeknessInput = "";
      this.toggleWeekness();
    });
  }

  removeWeekness(char: SuperpowerWeaknessModel) {
    this.profileService
      .removeWeekness(this.userId, char._id)
      .subscribe(data => {
        if (data)
          this.profile.weaknesses = this.profile.weaknesses.filter(
            wn => wn._id != char._id
          );
      });
  }

  updateSocialMedia(data) {
    this.profileService.updateSocialmedia(data, this.userId).subscribe(res => {
      if (res) {
        this.profile.facebook = data.facebook;
        this.profile.linkedIn = data.linkedIn;
        this.profile.twitter = data.twitter;
        this.profile.instagram = data.instagram;
      }
    });
  }

  toggleSuperpower() {
    this.enterSuperpower = !this.enterSuperpower;
  }

  toggleWeekness() {
    this.enterWeekness = !this.enterWeekness;
  }

  addNote(data: NoteModel) {
    this.profileService.postNote(this.userId, data).subscribe(data => {
      this.profile.notes.push(data);
    });
  }

  onAddCompany(e) {
    this.profile.companies.push(e);
  }

  deleteNote(note) {
    this.profileService.deleteNote(note._id).subscribe(data => {
      if (data)
        this.profile.notes = this.profile.notes.filter(
          nt => nt._id != note._id
        );
    });
  }

  deleteCompany(company) {
    this.profileService
      .deleteCompany(this.profile._id, company._id)
      .subscribe(data => {
        this.profile.companies = this.profile.companies.filter(
          cm => cm._id != company._id
        );
      });
  }

  stopClickDefaults(e, socailIndex) {
    e.preventDefault();
    e.stopPropagation();
    let { facebook, linkedIn, twitter, instagram } = this.profile;

    switch (socailIndex) {
      case 0:
        facebook = "";
        break;
      case 1:
        linkedIn = "";
        break;
      case 2:
        twitter = "";
        break;
      case 3:
        instagram = "";
        break;

      default:
        break;
    }
    let data = { facebook, linkedIn, twitter, instagram };
    this.updateSocialMedia(data);
  }

  openDialog(index): void {
    let _index = index;
    const dialogRef = this.dialog.open(SocailMediaDialog, {
      data: {
        facebook: this.profile.facebook,
        linkedIn: this.profile.linkedIn,
        twitter: this.profile.twitter,
        instagram: this.profile.instagram,
        index: _index
      },
      width: "390px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { facebook, linkedIn, twitter, instagram } = result;
        const data = { facebook, linkedIn, twitter, instagram };
        console.log(data);
        this.updateSocialMedia(data);
      }
    });
  }

  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(AddNotesDialog, {
      data: {
        date: "",
        title: "",
        body: ""
      },
      width: "560px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { date, title, body } = result;
        const data = { date, title, body } as NoteModel;
        this.addNote(data);
      }
    });
  }
}

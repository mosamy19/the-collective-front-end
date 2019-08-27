import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProfileService } from "../profile.service";
import {
  ProfileModel,
  WeaknessModel,
  SuperpowerModel,
  NoteModel
} from "../profile.model";
import { baseURL } from "src/app/shared/baseurl";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

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
  weeknessInput: string = "";

  filteredProfiles: ProfileModel[];
  query: string = "";

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.getRouteParams();
    this.filteredProfiles = [];
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
      this.profile = data;
      this.getNotes(this.userId);
    });
  }

  getNotes(id: string) {
    this.profileService.getNotes(id).subscribe(data => {
      this.profile.notes = data as NoteModel[];
      this.isLoaded = true;
    });
  }

  addSuperPower() {
    let data = { name: this.superpowerInput };
    this.profileService.addSuperpower(data, this.userId).subscribe(data => {
      console.log(data);
      this.profile.superpowers.push(data as SuperpowerModel);
      this.superpowerInput = "";
    });
  }

  addWeekness() {
    let data = { name: this.weeknessInput };
    this.profileService.addWeekness(data, this.userId).subscribe(data => {
      console.log(data);
      this.profile.weaknesses.push(data as WeaknessModel);
      this.weeknessInput = "";
    });
  }

  removeWeekness(char: WeaknessModel) {
    this.profileService
      .removeWeekness(this.userId, char._id)
      .subscribe(data => {
        if (data)
          this.profile.weaknesses = this.profile.weaknesses.filter(
            wn => wn._id != char._id
          );
      });
  }

  removeSuperpower(char: WeaknessModel) {
    this.profileService
      .removeSuperpower(this.userId, char._id)
      .subscribe(data => {
        if (data)
          this.profile.superpowers = this.profile.superpowers.filter(
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

  addNote(data: NoteModel) {
    this.profileService
      .postNote(this.userId, data)
      .subscribe(data => this.profile.notes.push(data));
  }

  deleteNote(note) {
    this.profileService.deleteNote(note._id).subscribe(data => {
      if (data)
        this.profile.notes = this.profile.notes.filter(
          nt => nt._id != note._id
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
      width: "390px",
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { facebook, linkedIn, twitter, instagram } = result;
        const data = { facebook, linkedIn, twitter, instagram };
        this.updateSocialMedia(data);
      }
    });
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
  openAddNoteDialog(): void {
    const dialogRef = this.dialog.open(AddNotesDialog, {
      data: {
        title: "",
        body: ""
      },
      width: "390px",
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { title, body } = result;
        const data = { title, body } as NoteModel;
        this.addNote(data);
      }
    });
  }
}

@Component({
  selector: "socail-media-dialog",
  templateUrl: "socail-media.dialog.html",
  styleUrls: ["./view-profile.component.scss"]
})
export class SocailMediaDialog {
  constructor(
    public dialogRef: MatDialogRef<SocailMediaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "add-note-dialog",
  templateUrl: "add-note.dialog.html",
  styleUrls: ["./view-profile.component.scss"]
})
export class AddNotesDialog {
  constructor(
    public dialogRef: MatDialogRef<AddNotesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

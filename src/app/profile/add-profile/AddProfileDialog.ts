import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SuperpowerService } from "../../services/superpower.service";
import { WeaknessService } from "src/app/services/weakness.service";
import { SuperpowerWeaknessModel } from "../../common/superpower-weakness.module";
import { PhoneService } from "src/app/phone/phone.service";
@Component({
  selector: "add-profile-dialog",
  templateUrl: "add-profile.dialog.html",
  styleUrls: ["add-profile.dialog.scss"]
})
export class AddProfileDialog {
  superpowers: SuperpowerWeaknessModel[] = [];
  userSuperpowers: SuperpowerWeaknessModel[] = [];
  newSuperpower: string = "";

  weaknesses: SuperpowerWeaknessModel[] = [];
  userWeaknesses: SuperpowerWeaknessModel[] = [];
  newWeakness: string = "";
  superpowerQuery: string = "";
  weaknessQuery: string = "";
  phoneCodes = [];
  constructor(
    public dialogRef: MatDialogRef<AddProfileDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private superpowerService: SuperpowerService,
    private weaknessService: WeaknessService,
    private phoneService: PhoneService
  ) {
    this.getPhoneCodes();
  }
  // private fb: FormBuilder

  getPhoneCodes() {
    this.phoneService.getPhoneCodes().subscribe(data => {
      this.phoneCodes = data;
    });
  }

  // remaningChars() {
  //   return 255 - this.data.body.length;
  // }

  searchSuperpowers(superpowerQuery) {
    if (superpowerQuery) {
      this.newSuperpower = superpowerQuery;
      this.superpowerService
        .getSeachResult(superpowerQuery)
        .subscribe(data => (this.superpowers = data));
    }
  }

  searchWeaknesses(weaknessQuery) {
    if (weaknessQuery) {
      this.newWeakness = weaknessQuery;
      this.weaknessService
        .getSeachResult(weaknessQuery)
        .subscribe(data => (this.weaknesses = data));
    }
  }

  addSuperpower(superpower: SuperpowerWeaknessModel) {
    this.userSuperpowers.push(superpower);
    this.data.superpowers.push(superpower);
  }

  addWeakness(weakness: SuperpowerWeaknessModel) {
    this.userWeaknesses.push(weakness);
    this.data.weaknesses.push(weakness);
  }

  saveSuperpower() {
    let _newSuperpower = { name: this.newSuperpower };
    this.superpowerService
      .addNewSuperpower(_newSuperpower as SuperpowerWeaknessModel)
      .subscribe(data => {
        this.userSuperpowers.push(data as SuperpowerWeaknessModel);
        this.data.superpowers.push(data);
      });
  }

  saveWeakness() {
    let _newWeakness = { name: this.newWeakness };
    this.weaknessService
      .addNewWeakness(_newWeakness as SuperpowerWeaknessModel)
      .subscribe(data => {
        this.userWeaknesses.push(data as SuperpowerWeaknessModel);
        this.data.weaknesses.push(data);
      });
  }

  removeSuperpower(superpower: SuperpowerWeaknessModel) {
    this.userSuperpowers = this.userSuperpowers.filter(
      sp => sp._id != superpower._id
    );
  }

  removeWeakness(weakness: SuperpowerWeaknessModel) {
    this.userWeaknesses = this.userWeaknesses.filter(
      sp => sp._id != weakness._id
    );
  }

  setProfileImageName() {
    let imageName = this.data.profileImg;
    imageName = imageName.substring(imageName.indexOf("-") + 1);
    return imageName;
  }

  onSuperpowerEnter(e, superpower = undefined) {
    if (e.source.selected) {
      if (superpower) {
        this.addSuperpower(superpower);
      } else {
        this.saveSuperpower();
      }
    }
  }
  onWeeknessEnter(e, weakness = undefined) {
    if (e.source.selected) {
      if (weakness) {
        this.addWeakness(weakness);
      } else {
        this.saveWeakness();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

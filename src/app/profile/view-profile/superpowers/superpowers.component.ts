import { Component, OnInit, Input, Output } from "@angular/core";
import { SuperpowerWeaknessModel } from "src/app/common/superpower-weakness.module";
import { ProfileService } from "../../profile.service";
import { SuperpowerService } from "src/app/services/superpower.service";

@Component({
  selector: "app-superpowers",
  templateUrl: "./superpowers.component.html",
  styleUrls: ["./superpowers.component.scss"]
})
export class SuperpowersComponent implements OnInit {
  @Input() public superpowers: SuperpowerWeaknessModel[] = [];
  @Input() public userId;
  searchResult: SuperpowerWeaknessModel[];
  enterSuperpower: boolean = false;
  superpowerQuery: string = "";
  constructor(
    private profileService: ProfileService,
    private superpowerService: SuperpowerService
  ) {
    this.searchResult = [];
  }

  ngOnInit() {}

  addSuperPower(superpower: SuperpowerWeaknessModel) {
    let data = { _id: superpower._id };
    this.profileService.addSuperpower(data, this.userId).subscribe(data => {
      this.superpowerQuery = "";
      this.superpowers.push(data);
      this.toggleSuperpower();
    });
  }

  toggleSuperpower() {
    this.enterSuperpower = !this.enterSuperpower;
  }

  removeSuperpower(char: SuperpowerWeaknessModel) {
    this.profileService
      .removeSuperpower(this.userId, char._id)
      .subscribe(data => {
        if (data) {
          this.superpowers = this.superpowers.filter(sp => sp._id != char._id);
        }
      });
  }

  searchSuperpowers(superpowerQuery) {
    if (superpowerQuery) {
      this.superpowerService.getSeachResult(superpowerQuery).subscribe(data => {
        this.searchResult = data;
      });
    } else {
      this.searchResult = [];
    }
  }

  saveSuperpower() {
    let _newSuperpower = { name: this.superpowerQuery };
    this.superpowerService
      .addNewSuperpower(_newSuperpower as SuperpowerWeaknessModel)
      .subscribe(data => {
        let sp = data as SuperpowerWeaknessModel;
        this.addSuperPower(sp);
      });
  }

  onSuperpowerEnter(e, superpower = undefined) {
    if (e.source.selected) {
      if (superpower) {
        this.addSuperPower(superpower);
      } else {
        this.saveSuperpower();
      }
    }
  }
}

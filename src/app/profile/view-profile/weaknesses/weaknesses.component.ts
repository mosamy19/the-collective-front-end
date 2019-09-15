import { Component, OnInit, Input } from "@angular/core";
import { SuperpowerWeaknessModel } from "src/app/common/superpower-weakness.module";
import { WeaknessService } from "src/app/services/weakness.service";
import { ProfileService } from "../../profile.service";

@Component({
  selector: "app-weaknesses",
  templateUrl: "./weaknesses.component.html",
  styleUrls: ["./weaknesses.component.scss"]
})
export class WeaknessesComponent implements OnInit {
  @Input() public weaknesses: SuperpowerWeaknessModel[] = [];
  @Input() public userId;
  searchResult: SuperpowerWeaknessModel[];
  enterWeakness: boolean = false;
  weaknessQuery: string = "";
  constructor(
    private profileService: ProfileService,
    private weaknessService: WeaknessService
  ) {
    this.searchResult = [];
  }

  ngOnInit() {}

  addWeakness(weakness: SuperpowerWeaknessModel) {
    let data = { _id: weakness._id };
    this.profileService.addWeekness(data, this.userId).subscribe(data => {
      this.weaknessQuery = "";
      this.weaknesses.push(data);
      this.toggleWeakness();
    });
  }

  toggleWeakness() {
    this.enterWeakness = !this.enterWeakness;
  }

  removeWeakness(char: SuperpowerWeaknessModel) {
    this.profileService
      .removeWeekness(this.userId, char._id)
      .subscribe(data => {
        if (data) {
          this.weaknesses = this.weaknesses.filter(wn => wn._id != char._id);
        }
      });
  }

  searchWeaknesses(weaknessQuery) {
    if (weaknessQuery) {
      this.weaknessService.getSeachResult(weaknessQuery).subscribe(data => {
        this.searchResult = data;
      });
    } else {
      this.searchResult = [];
    }
  }

  saveWeakness() {
    let _newWeakness = { name: this.weaknessQuery };
    this.weaknessService
      .addNewWeakness(_newWeakness as SuperpowerWeaknessModel)
      .subscribe(data => {
        let wn = data as SuperpowerWeaknessModel;
        this.addWeakness(wn);
      });
  }

  onWeaknessEnter(e, weakness = undefined) {
    if (e.source.selected) {
      if (weakness) {
        this.addWeakness(weakness);
      } else {
        this.saveWeakness();
      }
    }
  }
}

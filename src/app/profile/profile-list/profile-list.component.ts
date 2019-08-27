import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../profile.service";
import { ProfileModel } from "../profile.model";
import { baseURL } from "src/app/shared/baseurl";

@Component({
  selector: "app-profile-list",
  templateUrl: "./profile-list.component.html",
  styleUrls: ["./profile-list.component.scss"]
})
export class ProfileListComponent implements OnInit {
  profiles: ProfileModel[] = [];
  imgBaseUrl = baseURL + "uploads/";
  isLoaded: boolean = false;
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getProfiles();
  }

  getProfiles() {
    console.log("Init getProfiles");
    this.profileService.getProfileList().subscribe(data => {
      this.profiles = data;
      this.isLoaded = true;
    });
  }
}

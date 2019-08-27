import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { ProfileService } from "../profile.service";
import { ProfileModel } from "./../profile.model";
import { baseURL } from "./../../shared/baseurl";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: ProfileModel;
  profileImgUrl: string = "";
  userId: string = "";
  isLoaded: boolean = false;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getRouteParams();
  }

  getRouteParams() {
    this.route.params.subscribe((params: Params) => {
      if (this.router.url.includes("/edit")) {
        this.userId = params["profileId"];
        this.getProfile(this.userId);
      } else {
        this.isLoaded = true;
      }
    });
  }

  getProfile(id: string) {
    this.profileService.getProfile(id).subscribe(data => {
      this.profile = data;
      this.bindProfileData(this.profile);
    });
  }

  bindProfileData(profile: ProfileModel) {
    const {
      firstName,
      lastName,
      location,
      profileImg,
      primaryEmail,
      email,
      primaryPhone,
      phone,
      bio,
      facebook,
      instagram,
      twitter,
      linkedIn
    } = profile;
    this.profileForm.patchValue({
      firstName,
      lastName,
      location,
      profileImg,
      primaryEmail,
      email,
      primaryPhone,
      phone,
      bio,
      facebook,
      instagram,
      twitter,
      linkedIn
    });
    if (this.profileImgUrl)
      this.profileImgUrl = baseURL + "uploads/" + profileImg;
    this.isLoaded = true;
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      location: [""],
      profileImg: [""],
      primaryEmail: [""],
      email: [""],
      primaryPhone: [""],
      phone: [""],
      bio: [""],
      facebook: [""],
      instagram: [""],
      twitter: [""],
      linkedIn: [""]
    });
  }

  onProfileImgChange(imgName) {
    this.profileForm.controls.profileImg.setValue(imgName);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      if (this.userId) {
        this.profileService
          .EditProfile(this.profileForm.value, this.userId)
          .subscribe(data => {
            if (data) {
              this.router.navigate(["/profile/view", this.userId]);
            }
          });
      } else {
        this.profileService
          .PostProfile(this.profileForm.value)
          .subscribe(data => {
            if (data) {
              this.router.navigate(["/profile/view", data]);
            }
          });
      }
    }
  }

  get form() {
    return this.profileForm.controls;
  }
}

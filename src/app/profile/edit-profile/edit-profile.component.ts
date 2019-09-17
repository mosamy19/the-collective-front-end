import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
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
  imgBaseUrl = baseURL + "uploads/";
  profileForm: FormGroup;
  profile: ProfileModel;
  profileImgUrl: string = "";
  userId: string = "";
  emailModel: string = "";
  phoneModel: string = "";
  phonePrefix: string = "+1";
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
      this.userId = params["profileId"];
      this.getProfile(this.userId);
    });
  }

  getProfile(id: string) {
    this.profileService.getProfile(id).subscribe(data => {
      this.profile = data;
      this.bindProfileData(this.profile);
    });
  }

  bindProfileData(profile: ProfileModel) {
    const { name, location, profileImg, emails, phones, bio } = profile;

    if (emails) {
      emails.map(em => {
        let emailFG: FormGroup = this.fb.group({
          isPrimary: new FormControl(em.isPrimary),
          value: new FormControl(em.value)
        });
        (this.form.emails as FormArray).push(emailFG);
      });
    }
    if (phones) {
      phones.map(pn => {
        let phoneFG: FormGroup = this.fb.group({
          isPrimary: new FormControl(pn.isPrimary),
          value: new FormControl(pn.value)
        });
        if (pn.prefix) {
          phoneFG.addControl("prefix", new FormControl(pn.prefix));
        }
        (this.form.phones as FormArray).push(phoneFG);
      });
    }

    this.profileForm.patchValue({
      name,
      location,
      profileImg,
      bio
    });

    this.sortPrimaryFormGroup(this.form.emails);
    this.sortPrimaryFormGroup(this.form.phones);
    // if (profileImg) this.profileImgUrl = baseURL + "uploads/" + profileImg;
    this.isLoaded = true;
  }

  createForm() {
    this.profileForm = this.fb.group({
      name: [""],
      location: [""],
      profileImg: [""],
      emails: new FormArray([]),
      phones: new FormArray([]),
      bio: [""]
    });
  }

  onProfileImgChange(imgName) {
    this.profileForm.controls.profileImg.setValue(imgName);
    this.profile.profileImg = imgName;
  }

  onSubmit() {
    for (const [index, control] of (this.profileForm.controls
      .phones as FormArray).controls.entries()) {
      console.log(index, control);
      if (control instanceof FormGroup) {
        let val = control.controls.value.value;
        val;

        control.controls.value.setValue(val);
      }
    }
    if (this.profileForm.valid) {
      this.profileService
        .EditProfile(this.profileForm.value, this.userId)
        .subscribe(data => {
          if (data) {
            this.router.navigate(["/profile/view", this.userId]);
          }
        });
    }
  }

  removeProfilePic() {
    this.profile.profileImg = "";
    this.form.profileImg.setValue("");
  }

  addEmail() {
    let emailFG: FormGroup = this.fb.group({
      isPrimary: new FormControl(false),
      value: new FormControl(this.emailModel)
    });
    (this.form.emails as FormArray).push(emailFG);
    this.emailModel = "";
  }

  addPhone() {
    this.phoneModel = this.phoneModel
      .toString()
      .replace(/[\W_]+/g, "")
      .replace(/(\d{3})(\d{3})(\d{2,4})/, "($1) $2-$3");
    let phoneFG: FormGroup = this.fb.group({
      isPrimary: new FormControl(false),
      value: new FormControl(this.phoneModel),
      prefix: new FormControl(this.phonePrefix)
    });
    (this.form.phones as FormArray).push(phoneFG);
    this.phoneModel = "";
    this.phonePrefix = "+1";
  }

  makeEmailPrimary(ctrlIndex) {
    ctrlIndex;
    for (const [index, control] of (this.form
      .emails as FormArray).controls.entries()) {
      console.log(index, control);
      if (control instanceof FormGroup) {
        if (index != ctrlIndex) {
          control.controls.isPrimary.setValue(false);
        } else {
          control.controls.isPrimary.setValue(true);
        }
      }
    }
    this.sortPrimaryFormGroup(this.form.emails);
  }

  makePhonePrimary(ctrlIndex) {
    ctrlIndex;
    for (const [index, control] of (this.form
      .phones as FormArray).controls.entries()) {
      console.log(index, control);
      if (control instanceof FormGroup) {
        if (index != ctrlIndex) {
          control.controls.isPrimary.setValue(false);
        } else {
          control.controls.isPrimary.setValue(true);
        }
      }
    }
    this.sortPrimaryFormGroup(this.form.phones);
  }

  sortPrimaryFormGroup(formArray) {
    (formArray as FormArray).controls.sort(function(a, b) {
      if (a instanceof FormGroup && b instanceof FormGroup) {
        return a.controls.isPrimary.value === b.controls.isPrimary.value
          ? 0
          : a.controls.isPrimary.value
          ? -1
          : 1;
      }
    });
  }
  get form() {
    return this.profileForm.controls;
  }

  get formEmails() {
    return <FormArray>this.profileForm.get("emails");
  }
  get formPhones() {
    return <FormArray>this.profileForm.get("phones");
  }
}

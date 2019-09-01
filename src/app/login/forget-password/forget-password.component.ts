import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { LoginService } from "../login.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  incorrectEmail: boolean = false;
  emailSent: boolean = false;
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.forgetForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.forgetForm.controls.email.markAsTouched();
    this.incorrectEmail = false;
    this.emailSent = false;
    if (this.forgetForm.valid) {
      this.loginService.forgetPassword(this.forgetForm.value).subscribe(
        data => {
          this.emailSent = true;
          this.email.setValue("");
          this.email.markAsUntouched();
        },
        err => {
          if (err.status == 403) {
            this.incorrectEmail = true;
          }
        }
      );
    }
  }

  get email() {
    return this.forgetForm.get("email");
  }
}

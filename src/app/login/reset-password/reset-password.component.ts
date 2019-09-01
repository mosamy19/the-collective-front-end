import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoginService } from "../login.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.getRouteParams();
  }
  ngOnInit() {
    this.createForm();
  }

  getRouteParams() {
    this.route.params.subscribe((params: Params) => {
      this.token = params["token"];
      console.log(this.token);
    });
  }

  createForm() {
    this.resetForm = this.fb.group({
      password: ["", [Validators.required]],
      token: [this.token, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.loginService.resetPassword(this.resetForm.value).subscribe(data => {
        this.loginService.setToken(data.toString());
        this.router.navigate(["/profile/list"]);
      });
    }
  }
}

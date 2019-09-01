import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

export class User {
  _id: string;
  email: string;
  password: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  incorrectUser: boolean = false;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  onLogin() {
    //
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.incorrectUser = false;
      this.loginService.login(this.loginForm.value).subscribe(
        data => {
          this.loginService.setToken(data.toString());
          this.router.navigate(["/profile/list"]);
        },
        err => {
          if ((err.status = 400)) {
            this.incorrectUser = true;
          }
        }
      );
    }
  }
}

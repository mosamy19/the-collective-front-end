import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditProfileComponent } from "./profile/edit-profile/edit-profile.component";
import { ProfileListComponent } from "./profile/profile-list/profile-list.component";
import { ViewProfileComponent } from "./profile/view-profile/view-profile.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth-guard.service";
import { ResetPasswordComponent } from "./login/reset-password/reset-password.component";
import { ForgetPasswordComponent } from "./login/forget-password/forget-password.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/profile/list",
    pathMatch: "full"
  },
  {
    path: "profile",
    children: [
      { path: "", redirectTo: "/profile/list", pathMatch: "full" },
      {
        path: "list",
        component: ProfileListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "add",
        component: EditProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "view/:profileId",
        component: ViewProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "edit/:profileId",
        component: EditProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "reset-password/:token", component: ResetPasswordComponent },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "**", redirectTo: "/profile/list" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

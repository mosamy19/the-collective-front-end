import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
// FileSelectDirective
import { FileUploadModule } from "ng2-file-upload";
import { ImageUploaderComponent } from "./common/image-uploader/image-uploader.component";
import { EditProfileComponent } from "./profile/edit-profile/edit-profile.component";
import { ViewProfileComponent } from "./profile/view-profile/view-profile.component";
import { SocailMediaDialog } from "./profile/view-profile/SocailMediaDialog";
import { AddNotesDialog } from "./profile/view-profile/AddNotesDialog";
import { ProfileListComponent } from "./profile/profile-list/profile-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatFormFieldModule
} from "@angular/material";
import { SpinnerComponent } from "./common/spinner/spinner.component";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./login/reset-password/reset-password.component";
import { NavbarComponent } from "./common/navbar/navbar.component";
import { ForgetPasswordComponent } from "./login/forget-password/forget-password.component";
import { ProfileSearchComponent } from "./profile/profile-search/profile-search.component";
import { CompanySearchComponent } from "./profile/company-search/company-search.component";
import { AddCompanyDialog } from "./profile/company-search/AddCompanyDialog";
import { AddProfileDialog } from "./profile/add-profile/AddProfileDialog";
import { SuperpowersComponent } from "./profile/view-profile/superpowers/superpowers.component";
import { WeaknessesComponent } from "./profile/view-profile/weaknesses/weaknesses.component";
import { ProfileUploaderComponent } from "./profile/edit-profile/profile-uploader/profile-uploader.component";

@NgModule({
  declarations: [
    AppComponent,
    ImageUploaderComponent,
    EditProfileComponent,
    ViewProfileComponent,
    ProfileListComponent,
    SpinnerComponent,
    SocailMediaDialog,
    AddNotesDialog,
    AddCompanyDialog,
    AddProfileDialog,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    NavbarComponent,
    ProfileSearchComponent,
    CompanySearchComponent,
    SuperpowersComponent,
    WeaknessesComponent,
    ProfileUploaderComponent
    // FileSelectDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "collective-people" }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FileUploadModule
  ],
  entryComponents: [
    SocailMediaDialog,
    AddNotesDialog,
    AddCompanyDialog,
    AddProfileDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

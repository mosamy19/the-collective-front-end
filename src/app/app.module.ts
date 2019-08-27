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
import {
  ViewProfileComponent,
  SocailMediaDialog,
  AddNotesDialog
} from "./profile/view-profile/view-profile.component";
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
import { NavbarComponent } from "./common/navbar/navbar.component";

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
    LoginComponent,
    NavbarComponent
    // FileSelectDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
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
  entryComponents: [SocailMediaDialog, AddNotesDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

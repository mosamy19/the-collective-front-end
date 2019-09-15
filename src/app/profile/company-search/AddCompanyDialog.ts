import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "add-company-dialog",
  templateUrl: "add-company.dialog.html",
  styleUrls: ["./add-company.dialog.scss"]
})
// ./view-profile.component.scss
export class AddCompanyDialog {
  constructor(
    public dialogRef: MatDialogRef<AddCompanyDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
  typedChars() {
    return this.data.description.length;
  }
  // emaining
  onNoClick(): void {
    this.dialogRef.close();
  }

  setlogoImgName() {
    let imageName = this.data.logoImg;
    imageName = imageName.substring(imageName.indexOf("-") + 1);
    return imageName;
  }
}

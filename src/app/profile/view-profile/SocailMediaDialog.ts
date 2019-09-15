import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "socail-media-dialog",
  templateUrl: "socail-media.dialog.html",
  styleUrls: ["./view-profile.component.scss"]
})
export class SocailMediaDialog {
  constructor(
    public dialogRef: MatDialogRef<SocailMediaDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  keyDownFunction(e) {
    if (e.keyCode == 13) {
      this.dialogRef.close(this.data);
    }
  }
}

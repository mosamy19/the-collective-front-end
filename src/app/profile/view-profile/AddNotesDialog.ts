import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "add-note-dialog",
  templateUrl: "add-note.dialog.html",
  styleUrls: ["./view-profile.component.scss", "./add-note.dialog.scss"]
})
export class AddNotesDialog {
  constructor(
    public dialogRef: MatDialogRef<AddNotesDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}
  remaningChars() {
    return 255 - this.data.body.length;
  }
  // emaining
  onNoClick(): void {
    this.dialogRef.close();
  }
}

import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'borrar-usuarios-dialogos.html',
})
export class BorrarAnimationsExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<BorrarAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }}
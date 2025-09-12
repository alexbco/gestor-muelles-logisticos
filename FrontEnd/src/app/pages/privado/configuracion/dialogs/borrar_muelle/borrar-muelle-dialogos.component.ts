import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'borrar-muelle-dialogos.html',
})
export class BorrarMuelleDialog {

  constructor(
    public dialogRef: MatDialogRef<BorrarMuelleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }}
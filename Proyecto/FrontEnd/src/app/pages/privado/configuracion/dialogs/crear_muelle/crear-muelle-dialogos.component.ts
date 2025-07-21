import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'crear-muelle-dialog',
  templateUrl: 'crear-muelle-dialogos.html',
})
export class CrearMuelleDialog {

  muelleForm: FormGroup;
  disponibilidadOptions: string[] = ['Activo', 'Inactivo'];
  tipoCamionOptions: string[] = ['Camiones pequeños/furgonetas', 'Admite todo'];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CrearMuelleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.muelleForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipoCamionID: ['', Validators.required],
      disponibilidad: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onAgree(): void {
    if (this.muelleForm.valid) {
      this.dialogRef.close(this.muelleForm.value);
    }
  }

}

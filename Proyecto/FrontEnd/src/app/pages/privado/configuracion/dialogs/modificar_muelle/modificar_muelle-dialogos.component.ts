import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Muelles } from 'src/app/services/Interfaces/citas.interface';

@Component({
  selector: 'app-modificar-muelle-dialogo',
  templateUrl: './modificar_muelle-dialogos.html',
})
export class ModificarMuelleDialogoComponent implements OnInit {
  muelleForm: FormGroup;
  originalFormValue: any;
  disponibilidadOptions: string[] = ['Activo', 'Inactivo'];
  tipoCamionOptions: string[] = ['Camiones pequeños/furgonetas', 'Admite todo'];

  constructor(
    public dialogRef: MatDialogRef<ModificarMuelleDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Muelles,
    private formBuilder: FormBuilder
  ) {
    this.muelleForm = this.formBuilder.group({
      nombre: [this.data.nombre, Validators.required],
      tipoCamionID: [this.tipoCamionOptions[(this.data.tipoCamionID)-1], Validators.required],
      disponibilidad: [this.data.disponibilidad, Validators.required],
    });
  }
  

  ngOnInit() {
    this.originalFormValue = this.muelleForm.value;
  }

  isFormModified(): boolean {
    return JSON.stringify(this.muelleForm.value) !== JSON.stringify(this.originalFormValue);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAgree(): void {
    if (this.muelleForm.valid) {
      const updatedMuelle: Muelles = {
        ...this.data,
        nombre: this.muelleForm.value.nombre,
        tipoCamionID: this.muelleForm.value.tipoCamionID,
        disponibilidad: this.muelleForm.value.disponibilidad
      };
      this.dialogRef.close(updatedMuelle);
    }
  }
}

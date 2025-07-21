import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Franjas, Muelles } from 'src/app/services/Interfaces/citas.interface';
import { Usuario } from 'src/app/services/Interfaces/usuario.interface';

@Component({
  selector: 'app-reserva-cita',
  templateUrl: './reservar-dialogos.html'
})
export class ReservarDialogoComponent implements OnInit {
  citaForm: FormGroup;
  paletsOptions: number[] = [];
  formValue: { muelle: Muelles; franja: Franjas; fecha: Date; usuario: Usuario }[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReservarDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { muelle: Muelles; franja: Franjas; fecha: Date; usuario: Usuario },
    private formBuilder: FormBuilder
  ) {
    this.citaForm = this.formBuilder.group({
      fecha: [{ value: this.data.fecha, disabled: true }, Validators.required],
      usuario: [{ value: this.data.usuario.usuario, disabled: true }, Validators.required],
      muelle: [{ value: this.data.muelle.nombre, disabled: true }, Validators.required],
      franja: [{ value: this.getFormattedFranja(), disabled: true }, Validators.required],
      mercancias: this.formBuilder.array([]) // Array of mercancias
    });
    this.formValue = [this.data];
  }

  ngOnInit() {
    this.asignarLimitePalets();
    this.agregarMercancia();
  }

  asignarLimitePalets() {
    if (this.data.muelle.tipoCamionID === 1) {
      this.paletsOptions = Array.from({ length: 10 }, (_, i) => i + 1);
    } else if (this.data.muelle.tipoCamionID === 2) {
      this.paletsOptions = Array.from({ length: 30 }, (_, i) => i + 1);
    }
  }

  getFormattedFranja(): string {
    const horaInicio = this.data.franja.horaInicio.slice(0, 5);
    const horaFinal = this.data.franja.horaFinal.slice(0, 5);
    return `${horaInicio} - ${horaFinal}`;
  }

  // Obtener el formulario de mercancias
  get mercanciasFormArray(): FormArray {
    return this.citaForm.get('mercancias') as FormArray;
  }

  // Agregar una mercancia al formulario
  agregarMercancia(): void {
    const mercanciaFormGroup = this.formBuilder.group({
      mercancia: [null, [Validators.required, Validators.maxLength(50)]],
      palets: [null, Validators.required]
    });
    this.mercanciasFormArray.push(mercanciaFormGroup);
  }

  // Eliminar una mercancia del formulario
  eliminarMercancia(index: number): void {
    this.mercanciasFormArray.removeAt(index);
  }

  // Verificar si el formulario tiene al menos una mercancia
  get tieneMercancias(): boolean {
    return this.mercanciasFormArray.length > 0;
  }

  // Obtener la cantidad de palets disponibles
  getPaletsDisponibles(): number {
    let paletsUtilizados = 0;
    const mercancias = this.mercanciasFormArray.controls;

    for (const mercancia of mercancias) {
      const palets = mercancia.get('palets')?.value;
      paletsUtilizados += palets;
    }

    return this.paletsOptions.length - paletsUtilizados;
  }

  // Cerrar el diálogo sin devolver ningún valor
  onCancel(): void {
    this.dialogRef.close();
  }

  // Enviar el formulario si es válido y tiene al menos una mercancia
  onAgree(): void {
    if (this.citaForm.valid && this.tieneMercancias) {
      const mercancias = this.mercanciasFormArray.value; // Obtener los valores de las mercancías
      const formValueWithMercancias = { ...this.formValue[0], mercancias }; // Agregar las mercancías al formValue
      this.dialogRef.close(formValueWithMercancias); // Retornar el formValue cuando se cierre el diálogo
    }
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/services/Interfaces/usuario.interface';

@Component({
  selector: 'app-actualizar-usuarios',
  templateUrl: './actualizar.component.html'
})
export class ActualizarComponent implements OnInit {
  seleccionado: any[] = []; // Debes ajustar el tipo según tus necesidades
  usuarioForm: FormGroup;
  roles = ['Administrador', 'Operario', 'Usuario'];
  selectedRole = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<ActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { datosUsuario: any, usuarioSeleccionado: any },
    private formBuilder: FormBuilder
  ) {
    this.selectedRole = new FormControl(this.roles[0]);
    this.usuarioForm = this.formBuilder.group({
      nombre: [this.data.datosUsuario.usuario, Validators.required],
      email: [this.data.datosUsuario.email, [Validators.required, Validators.email]],
      password: [this.data.datosUsuario.password, Validators.required], // Add the 'password' form control
      rol: [this.data.datosUsuario.perfil.nombre, Validators.required] // Add the 'rol' form control
    });
  }

  ngOnInit() {
   }

  onAgree(): void {
    if (this.usuarioForm.valid) {
      this.dialogRef.close(this.usuarioForm.value); // Returns the form value when the dialog is closed
    }
  }


}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario-dialogo',
  templateUrl: './agregar-usuarios-dialogos.html'
})
export class AgregarUsuarioDialogoComponent implements OnInit {
  usuarioForm: FormGroup;
  roles = ['Administrador', 'Operario', 'Usuario'];
  selectedRole = new FormControl();
  usuariosEmail: string[] = []; // Array to store existing emails


  constructor(
    public dialogRef: MatDialogRef<AgregarUsuarioDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { emailsUsuarios: string[] },
    private formBuilder: FormBuilder,
  ) {
    this.selectedRole = new FormControl(this.roles[0]);
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,this.checkEmailAvailability.bind(this)]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")]],
      rol: ['', Validators.required] // Add the 'rol' form control
    });

  }

  ngOnInit() {
  }

  checkEmailAvailability(control: FormControl) {
    const email = control.value;
    if (this.data.emailsUsuarios.includes(email)) {
      return { emailExists: true };
    }
    return null;
  }

  
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onAgree(): void {
    if (this.usuarioForm.valid) {
      this.dialogRef.close(this.usuarioForm.value); // Returns the form value when the dialog is closed
    }
  }

 
}

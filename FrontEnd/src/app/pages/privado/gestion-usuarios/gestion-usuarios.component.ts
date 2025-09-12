import { Component, OnInit } from "@angular/core";
import { IRegistro, Usuario } from "src/app/services/Interfaces/usuario.interface";
import { UsersService } from "../../../services/users.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from "./dialogs/borrar/borrar-usuarios-dialogos.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AgregarUsuarioDialogoComponent } from "./dialogs/registrar/agregar-usuarios-dialogos.component";
import { ActualizarComponent } from "./dialogs/actualizar/actualizar.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CitasService } from "src/app/services/citas.service";

@Component({
  selector: "app-gestion-usuarios",
  templateUrl: "./gestion-usuarios.component.html",
  styleUrls: ["./gestion-usuarios.component.css"],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ]),
    trigger('scaleInOut', [
      state('void', style({ transform: 'scale(0)' })),
      transition(':enter', [
        animate(300, style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['select', 'id', 'nombre', 'email', 'perfil'];
  dataSource = new MatTableDataSource<Usuario>();
  selection = new SelectionModel<Usuario>(true, []);
  usuariosEmail: string[] = [];
  loading: boolean = false;
  klk: boolean = false;

  constructor(
    public userService: UsersService,
    private citaService: CitasService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true; // Set loading to true before making the API call

    this.userService.getUsuariosConPerfiles().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
  
        // Sort the usuarios array by profile in the desired order
        this.usuarios.sort((a, b) => {
          if (a.perfil.nombre === 'Administrador' && b.perfil.nombre !== 'Administrador') {
            return -1; // "Administrador" comes before other profiles
          } else if (a.perfil.nombre !== 'Administrador' && b.perfil.nombre === 'Administrador') {
            return 1; // "Administrador" comes before other profiles
          } else if (a.perfil.nombre === 'Operario' && b.perfil.nombre === 'Usuario') {
            return -1; // "Operario" comes before "Usuario"
          } else if (a.perfil.nombre === 'Usuario' && b.perfil.nombre === 'Operario') {
            return 1; // "Operario" comes before "Usuario"
          } else {
            return 0; // No change in order
          }
        });
    
        this.dataSource.data = this.usuarios;
        for (let index = 0; index < usuarios.length; index++) {
          this.usuariosEmail.push(usuarios[index].email);
        }
        this.loading = false; // Set loading to false in case of an error

      },
      error: (error: any) => {
        console.log(error);
        this.loading = false; // Set loading to false in case of an error

      }
    });
  }
  

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Usuario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  hasAdminUser(): boolean {
    for (const user of this.selection.selected) {
      if (user.perfil.nombre === 'Administrador') {
        return true;
      }
    }
    return false;
  }
  getUsuariosSeleccionados() {
    const usuariosSeleccionados = this.selection.selected;
    for (let index = 0; index < usuariosSeleccionados.length; index++) {
      console.log(usuariosSeleccionados[index].id);
    }
  }

  borrarUsuario() {
    const usuariosSeleccionados = this.selection.selected;
    for (let index = 0; index < usuariosSeleccionados.length; index++) {
      const usuario = usuariosSeleccionados[index];
      const usuarioId = usuario.id;
      this.userService.borrarUsuario(usuarioId).subscribe(
        () => {
          this.citaService.borrarCitasPorUsuario(usuario.usuario).subscribe(
            () => {
              this.cargarUsuarios();
              this.selection.clear();
              this.snackBar.open('Usuario eliminado', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            },
            error => {
              console.log(`Error al borrar las citas del usuario ${usuario.usuario}:`, error);
            }
          );
        },
        error => {
          console.log(`Error al borrar el usuario con ID ${usuarioId}:`, error);
        }
      );
    }
  }

  openDialogBorrarUsuario(): void {
    let usuariosSeleccionados = "";
    for (let index = 0; index < this.selection.selected.length; index++) {
      usuariosSeleccionados += this.selection.selected[index].usuario + ", ";
    }

    if (usuariosSeleccionados.length > 0) {
      usuariosSeleccionados = usuariosSeleccionados.slice(0, -2);
    }

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      data: { userName: usuariosSeleccionados },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.borrarUsuario();
      }
    });
  }

  Registrar(FormUser: IRegistro): void {
    this.userService.registrar(FormUser).subscribe(
      () => {
        this.cargarUsuarios();
        this.selection.clear();
        this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      },
      error => {
        console.log(error);
        if (error && error.error && error.error.message) {
          const mensajeError = error.error.message;
          this.snackBar.open(mensajeError, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      }
    );
  }

  openDialogAgregarUsuario(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioDialogoComponent, {
      data: {
        emailsUsuarios: this.usuariosEmail
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(formValue => {
      if (formValue) {
        switch (formValue.rol) {
          case 'Usuario':
            formValue.rol = 3;
            break;
          case 'Operario':
            formValue.rol = 2;
            break;
          case 'Administrador':
            formValue.rol = 1;
            break;
        }
      }

      const FormUser: IRegistro = {
        Usuario: formValue.nombre,
        Email: formValue.email,
        Password: formValue.password,
        PerfilID: formValue.rol
      };

      this.Registrar(FormUser);
    });
  }

  Actualizar(UserId: number, FormUser: IRegistro): void {
    this.userService.actualizar(UserId, FormUser).subscribe(() => {
      this.cargarUsuarios();
      this.selection.clear();
      this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
  }

  openDialogActualizarUsuario(): void {
    const dialogRef = this.dialog.open(ActualizarComponent, {
      data: {
        datosUsuario: this.selection.selected[0]
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(formValue => {
      if (formValue) {
        switch (formValue.rol) {
          case 'Usuario':
            formValue.rol = 3;
            break;
          case 'Operario':
            formValue.rol = 2;
            break;
          case 'Administrador':
            formValue.rol = 1;
            break;
        }
      }

      const FormUser: IRegistro = {
        Usuario: formValue.nombre,
        Email: formValue.email,
        Password: formValue.password,
        PerfilID: formValue.rol
      };

      this.Actualizar(this.selection.selected[0].id, FormUser);
    });
  }
}

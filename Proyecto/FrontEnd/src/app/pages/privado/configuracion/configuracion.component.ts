import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Muelles, MuellesDTO, TipoMuelles } from 'src/app/services/Interfaces/citas.interface';
import { CitasService } from "src/app/services/citas.service";
import { UsersService } from "../../../services/users.service";
import { BorrarMuelleDialog } from "./dialogs/borrar_muelle/borrar-muelle-dialogos.component";
import { CrearMuelleDialog } from "./dialogs/crear_muelle/crear-muelle-dialogos.component";
import { ModificarMuelleDialogoComponent } from "./dialogs/modificar_muelle/modificar_muelle-dialogos.component";

@Component({
  selector: "app-calendario-config",
  templateUrl: "./configuracion.component.html",
  styleUrls: ["./configuracion.component.css"],
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
export class ConfiguracionComponent implements OnInit {

  muelles: Muelles[] = [];
  tipo_muelles: TipoMuelles[] = [];
  borrarDisabled = true;
  user = JSON.parse(sessionStorage.getItem('user')!);
  perfilID = this.user.perfilID;
  loading = false;

  constructor(public userService: UsersService, public citasService: CitasService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
  }

  // Obtener los muelles
  getMuelles() {
    this.citasService.muelles_all().subscribe(
      (muelles: Muelles[]) => {
        this.muelles = muelles;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Obtener los tipos de muelles
  getTipoMuelles() {
    this.citasService.tipoMuelles().subscribe(
      (response: TipoMuelles[] | any) => {
        this.tipo_muelles = response;
      },
      (error: any) => {
        console.log('Error al obtener los muelles:', error);
      }
    );
  }

  // Obtener los datos iniciales
  getData() {
    this.loading = true;
    this.getMuelles();
    this.getTipoMuelles();
    this.loading = false;
  }

  // Obtener la descripción del muelle
  getDescripcionMuelle(tipoCamionID: number): string {
    const muelle = this.tipo_muelles.find(m => m.id === tipoCamionID);
    return muelle ? muelle.descripcion : '';
  }

  // Borrar un muelle
  borrarMuelle(muelle: Muelles): void {
    if (this.muelles.indexOf(muelle) >= 4) {
      const id_muelle = muelle.id;

      const dialogRef = this.dialog.open(BorrarMuelleDialog, {
        width: '400px',
        data: { muelle: muelle },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.citasService.borrarMuelle(id_muelle).subscribe(
            () => {
              this.snackBar.open('Muelle eliminado correctamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
              this.getMuelles();
              this.getTipoMuelles();
            },
            (error) => {
              console.log('Error al eliminar el muelle', error);
            }
          );
        }
      });
    } else {
      this.snackBar.open('No puedes tener menos de 4 muelles.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
      });
    }
  }

  // Modificar un muelle
  modificarMuelle(muelle: Muelles) {
    const dialogRef = this.dialog.open(ModificarMuelleDialogoComponent, {
      data: muelle,
      width: '700px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Muelles) => {
      if (result) {
        let tipoCamionID: number;
        if (result.tipoCamionID.toString() === "Camiones pequeños/furgonetas") {
          tipoCamionID = 1;
        } else {
          tipoCamionID = 2;
        }

        const muelle_actualizar: Muelles = {
          id: muelle.id,
          nombre: result.nombre,
          disponibilidad: result.disponibilidad,
          tipoCamionID: tipoCamionID
        }

        this.citasService.actualizarMuelle(muelle_actualizar).subscribe(
          (response) => {
            this.snackBar.open('Muelle actualizador correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            this.getMuelles();
            this.getTipoMuelles();
          },
          (error: any) => {
            console.error('Error al crear el muelle:', error);
            if (error.error && error.error.errors) {
              console.log('Errores de validación:', error.error.errors);
            }
          }
        );
      }
    });
  }

  // Crear un nuevo muelle
  nuevoMuelle() {
    const dialogRef = this.dialog.open(CrearMuelleDialog, {
      width: '700px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result: MuellesDTO) => {
      if (result) {
        let tipoCamionID: number;
        if (result.tipoCamionID.toString() === "Camiones pequeños/furgonetas") {
          tipoCamionID = 1;
        } else {
          tipoCamionID = 2;
        }

        const muelle: MuellesDTO = {
          nombre: result.nombre,
          disponibilidad: result.disponibilidad,
          tipoCamionID: tipoCamionID
        }

        this.citasService.CrearMuelle(muelle).subscribe(
          (response) => {
            this.snackBar.open('Muelle creado', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            this.getMuelles();
            this.getTipoMuelles();
          },
          (error: any) => {
            console.error('Error al crear el muelle:', error);
            if (error.error && error.error.errors) {
              console.log('Errores de validación:', error.error.errors);
            }
          }
        );
      }
    });
  }

}

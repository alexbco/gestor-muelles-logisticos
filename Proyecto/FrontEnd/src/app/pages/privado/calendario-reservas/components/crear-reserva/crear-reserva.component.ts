import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsociarCitaPedidos, Cita, CitasPedido, ComprobarReserva, DatosReserva, FormularioReserva, Franjas, Muelles, Pedido, Vehiculo } from 'src/app/services/Interfaces/citas.interface';
import { CitasService } from 'src/app/services/citas.service';
import { ReservarDialogoComponent } from './dialog/reservar/reservar-dialogos.component';
import { ActualizarCitasService } from '../../../../../services/ActualizarCitas.service';
import { BorrarAnimationsExampleDialog } from './dialog/borrar/borrar-usuarios-dialogos.component';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  listado_vehiculos: Vehiculo[] = [];
  tipoCamionID = 0;
  total_palets_por_cita = 0;
  listado_citas: Cita[] = [];
  citas_dia: Cita[] = [];
  @Input() selected: Date | null = null;
  muelles_disponibles: Muelles[] = [];
  franjas: Franjas[] = [];
  fecha_formateada: string = '';
  user = JSON.parse(sessionStorage.getItem("user")!);
  cita_de_usuario_registrado = false;
  loading:boolean = false;
  constructor(private citas: CitasService, public dialog: MatDialog, private snackBar: MatSnackBar, private actualizarCitasService: ActualizarCitasService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.loading = true;
    this.getCitas();
    this.getMuelles();
    this.getFranjas();
    this.loading = false;
  }

  // Obtener las franjas
  getFranjas() {
    this.citas.franjas().subscribe(
      (response: Franjas[] | any) => {
        this.franjas = response;

        // Formatear las horas de inicio y final
        this.franjas = this.franjas.map((franja) => {
          const horaInicio = new Date(franja.horaInicio);
          const horaFinal = new Date(franja.horaFinal);
          const horaInicioFormateada = horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const horaFinalFormateada = horaFinal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

          return { ...franja, horaInicio: horaInicioFormateada, horaFinal: horaFinalFormateada };
        });

        // console.log(this.franjas);
      },
      (error: any) => {
        console.log('Error al obtener las franjas:', error);
      }
    );
  }
getTipoVehiculos() {
  this.loading = true;
  this.citas.tipoVehiculos().subscribe(
    (response: Vehiculo[] | any) => {
      this.listado_vehiculos = response;
      this.citas_dia.forEach((cita) => {
        const vehiculo = this.listado_vehiculos.find((v) => v.id === cita.tipoCamionID);
        if (vehiculo) {
          cita.descripcionVehiculo = vehiculo.descripcion;
        }
      });
      this.loading = false;
    },
    (error: any) => {
      console.log('Error al obtener los vehiculos:', error);
      this.loading = false;
    }
  );
}

  // Obtener todas las citas
  getCitas() {
    this.citas.all().subscribe(
      (response: Cita[] | any) => {
        this.listado_citas = response;
        this.selected = this.selected || new Date(); // Si no hay una fecha seleccionada, se establece la fecha actual
        this.citasPorDia();
      },
      (error: any) => {
        console.log('Error al obtener las citas:', error);
      }
    );
    this.getTipoVehiculos();

  }

  // Obtener los muelles
  getMuelles() {
    this.citas.muelles().subscribe(
      (response: Muelles[] | any) => {
        this.muelles_disponibles = response;
      },
      (error: any) => {
        console.log('Error al obtener los muelles:', error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getCitas();
    this.getMuelles();
    this.getFranjas();
    this.actualizarCitasService.emitirEvento();
    if (changes['selected'] && !changes['selected'].firstChange) {
      this.citasPorDia();
      this.fecha_formateada = this.formatDate(this.selected); // Mueve la asignación aquí
    }
  }

  // Formatear la fecha en formato "yyyy-mm-dd"
  formatDate(date: Date | null): string {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  // Obtener las citas para el día seleccionado
  citasPorDia() {
    this.citas_dia = this.listado_citas.filter((cita) => {
      const citaDate = new Date(cita.fecha);
      return citaDate.toDateString() === (this.selected ? this.selected.toDateString() : '');
    });

    // Ordenar las citas por franjas.horaInicio en orden ascendente
    this.citas_dia.sort((a, b) => {
      const horaInicioA = new Date(a.franjas.horaInicio).getTime();
      const horaInicioB = new Date(b.franjas.horaInicio).getTime();
      return horaInicioA - horaInicioB;
    });
  }


  // Comprobar si hay una reserva para el muelle y franja seleccionados
  ComprobarReserva(muelleID: number, franjaID: number): boolean {
    this.cita_de_usuario_registrado = false;
    for (let index = 0; index < this.citas_dia.length; index++) {
      if (this.citas_dia[index].muelles.id === muelleID && this.citas_dia[index].franjas.id === franjaID) {
        if (this.citas_dia[index].usuario === this.user.usuario || this.user.perfilID === 1 || this.user.perfilID === 2) {
          this.cita_de_usuario_registrado = true;
        }
        return true;
      }
    }
    return false;
  }



  // Reservar una cita y subir los pedidos
  Reservar(result: FormularioReserva): void {
    //Obtener el total de palets por cita
    for (let index = 0; index < result.mercancias.length; index++) {
      this.total_palets_por_cita += result.mercancias[index].palets;
    }

    if (this.total_palets_por_cita < 3) {
      this.tipoCamionID = 1
    } else if (this.total_palets_por_cita >= 3 && this.total_palets_por_cita <= 10) {
      this.tipoCamionID = 2
    } else if (this.total_palets_por_cita > 10) {
      this.tipoCamionID = 3
    };

    var cita: DatosReserva = {
      fecha: result.fecha,
      usuario: result.usuario.usuario,
      franjaID: result.franja.id,
      muelleID: result.muelle.id,
      tipoCamionID: this.tipoCamionID
    }

    var CantidadPedidos: AsociarCitaPedidos = {
      CantidadPedidos: result.mercancias.length
    }

    // Realizar la reserva
    this.citas.reservar(cita).subscribe(() => {
      this.getCitas();
      this.snackBar.open('¡Reserva exitosa!', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });

      // Subir los pedidos
      for (let index = 0; index < result.mercancias.length; index++) {
        var pedido: Pedido = {
          mercancia: result.mercancias[index].mercancia,
          palets: result.mercancias[index].palets
        }

        this.citas.subir_pedido(pedido).subscribe(
          () => {
            // Hacer algo después de subir el pedido
          },
          (error) => {
            console.log(error);
            if (error && error.error && error.error.message) {
              const mensajeError = error.error.message;
              this.snackBar.open(mensajeError, 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }
          }
        );
      }

      // Asociar los pedidos con la última cita
      this.citas.AsociarCitaPedidos(CantidadPedidos).subscribe(
        () => {
          // Hacer algo después de asociar los pedidos
          this.actualizarCitasService.emitirEvento();
        },
        (error) => {
          console.log(error);
          if (error && error.error && error.error.message) {
            const mensajeError = error.error.message;
            this.snackBar.open(mensajeError, 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        }
      );

      this.snackBar.open('¡Reserva exitosa!', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });

    // Completar el campo vehiculo
    this.getCitas();
    this.getTipoVehiculos();

    // Poner a 0 los palets de la cita para que no se acumulen
    this.total_palets_por_cita = 0;
    this.tipoCamionID = 0;
  }



  // Abrir el diálogo de reserva
  openDialogReservar(muelleID: number, franjaID: number): void {
    const selectedDate = this.formatDate(this.selected);

    const muelle = this.muelles_disponibles.find((muelle) => muelle.id === muelleID);
    const franja = this.franjas.find((franja) => franja.id === franjaID);
    const usuario = this.user;

    const dialogRef = this.dialog.open(ReservarDialogoComponent, {
      data: { muelle, franja, fecha: selectedDate, usuario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Reservar(result);
      }
    });
  }


  borrarReserva(muelle: Muelles, franja: Franjas): void {
    const cita = this.buscarCita(muelle.id, franja.id);

    const dialogRef = this.dialog.open(BorrarAnimationsExampleDialog, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (cita) {
          const citaID = cita.id;
          console.log(cita);
          this.citas.borrarCita(citaID).subscribe(
            () => {
              this.getCitas();
              this.actualizarCitasService.emitirEvento();
              this.snackBar.open('Reserva cancelada', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            },
            (error: any) => {
              console.log('Error al cancelar la reserva:', error);
              // Manejar el error adecuadamente
            }
          );
        }
      }
    });


  }

  buscarCita(muelleId: number, franjaId: number): Cita | undefined {
    return this.citas_dia.find(cita => cita.muelles.id === muelleId && cita.franjas.id === franjaId);
  }

}

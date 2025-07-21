import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CitasService } from 'src/app/services/citas.service';
import { Cita, CitasPedido, Vehiculo, Pedido, PedidoBusqueda, Muelles } from 'src/app/services/Interfaces/citas.interface';
import { ActualizarCitasService } from '../../../../../services/ActualizarCitas.service';
import { map, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UsuarioRegistrado } from 'src/app/services/Interfaces/usuario.interface';

@Component({
  selector: 'app-informe-reservas',
  templateUrl: './informe-reservas.component.html',
  styleUrls: ['./informe-reservas.component.css'],
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

export class InformeReservasComponent implements OnChanges {
  listado_citas_pedidos: CitasPedido[] = [];
  listado_citas: Cita[] = [];
  listado_pedidos: PedidoBusqueda[] = [];
  citas_dia: Cita[] = [];
  listado_vehiculos: Vehiculo[] = [];
  @Input() selected: Date | null = null;
  selectedCita: Cita | null = null;
  pedidosCita: PedidoBusqueda[] = []; // Agregar la propiedad pedidosCita
  expandedCita: any = null; // Nueva propiedad
  muelles_disponibles: Muelles[] = [];
  loading = false;
  user: UsuarioRegistrado;

  

  constructor(private citas: CitasService, private actualizarCitasService: ActualizarCitasService) { 
    this.user = JSON.parse(sessionStorage.getItem("user")!);
  }

  
  ngOnInit() {
    this.loadData();

    this.actualizarCitasService.obtenerEvento().subscribe(() => {
      this.loadData();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected'] && !changes['selected'].firstChange) {
      this.citasPorDia();
    }
  }

  loadData() {
    this.loading = true;
    this.getCitas();
    this.getTipoVehiculos();
    this.getMuelles();
    this.getPedidos();
  }

  getCitas() {
    this.citas.all().subscribe(
      (response: Cita[] | any) => {
        this.listado_citas = response;
        this.selected = this.selected || new Date();
        this.getTipoVehiculos(); // Mover aquí

        this.citasPorDia();

        // Set loading to false when all data is loaded
      },
      (error: any) => {
        console.log('Error al obtener las citas:', error);
      }
    );
  }


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

  getPedidos() {
    this.citas.pedidos().subscribe(
      (response: PedidoBusqueda[] | any) => {
        this.listado_pedidos = response;
        this.citaPedidos();
        
      },
      (error: any) => {
        console.log('Error al obtener los pedidos:', error);
      }
    );
  }

  citasPorDia() {
    this.citas_dia = this.listado_citas.filter((cita) => {
      const citaDate = new Date(cita.fecha);
      return citaDate.toDateString() === (this.selected ? this.selected.toDateString() : '');
    });

    this.citas_dia.sort((a, b) => {
      const horaInicioA = new Date(a.franjas.horaInicio).getTime();
      const horaInicioB = new Date(b.franjas.horaInicio).getTime();
      return horaInicioA - horaInicioB;
    });
  }

  getTipoVehiculos() {
    this.loading = true;
  
    this.citas.tipoVehiculos().pipe(
      map((response: Vehiculo[] | any) => {
        this.listado_vehiculos = response;
        return this.listado_vehiculos;
      })
    ).subscribe(
      () => {
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
      },
    );
  }
  

  citaPedidos() {
    this.citas.citaPedidos().subscribe(
      (response: CitasPedido[] | any) => {
        this.listado_citas_pedidos = response;

        // Filtrar los pedidos que corresponden a la cita seleccionada
        this.pedidosCita = this.listado_pedidos.filter(pedido =>
          this.listado_citas_pedidos.some(citaPedido => citaPedido.citaID === this.selectedCita?.id)
        );

        // ...
      },
      (error: any) => {
        console.log('Error al obtener la relación entre citas y pedidos:', error);
      }
    );
  }
  
  getCitaPedidos(cita: Cita): Pedido[] {
    const pedidosCita: Pedido[] = [];
  
    for (let i = 0; i < this.listado_citas_pedidos.length; i++) {
      if (cita.id === this.listado_citas_pedidos[i].citaID) {
        const pedidoID = this.listado_citas_pedidos[i].pedidoID;
        const pedido = this.listado_pedidos.find(p => p.id === pedidoID);
        if (pedido) {
          pedidosCita.push(pedido);
        }
      }
    }
    return pedidosCita;
  }

  

  toggleCitaDetails(cita: Cita): any {
    if (this.user.perfilNombre == 'Usuario') {
      return false;
    }else{
      this.selectedCita = this.selectedCita === cita ? null : cita;
    }
  }
}

import { Usuario } from "./usuario.interface";

export interface Cita {
  id: number;
  fecha: Date;
  usuario: string;
  franjaId: number;
  franjas: Franjas;
  muelleId: number;
  muelles: Muelles;
  tipoCamionID: number;
  descripcionVehiculo: string;
}

export interface Pedido {
  mercancia: string;
  palets: number;
}

export interface PedidoBusqueda {
  id: number;
  mercancia: string;
  palets: number;
}

export interface CitasPedido {
  citaID: number;
  pedidoID: number;
}

export interface Franjas {
  id: number;
  horaInicio: string;
  horaFinal: string;
}

export interface Muelles {
  id: number;
  nombre: string;
  disponibilidad: string;
  tipoCamionID: number;
}

export interface MuellesDTO {
  nombre: string;
  disponibilidad: string;
  tipoCamionID: number;
}

export interface TipoMuelles {
  id: number;
  descripcion: string;
}

export interface Vehiculo {
  id: number;
  descripcion: string;
}


export interface ComprobarReserva{
  fecha: string;
  franjaID: number,
  muelleID: number,
}

export interface DatosReserva{
  fecha: Date;
  usuario: string;
  muelleID: number;
  franjaID: number;
  tipoCamionID: number;
}

export interface FormularioReserva{
  fecha: Date;
  franja: Franjas;
  mercancias: Mercancias[];
  muelle: Muelles;
  usuario: Usuario;
}

export interface Mercancias{
  mercancia: string;
  palets: number;
}

export interface AsociarCitaPedidos{
  CantidadPedidos: number;
}
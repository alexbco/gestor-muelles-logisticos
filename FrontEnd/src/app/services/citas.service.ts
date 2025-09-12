import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {  AsociarCitaPedidos, ComprobarReserva, DatosReserva, Muelles, MuellesDTO, Pedido } from "./Interfaces/citas.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CitasService {
  constructor(private http: HttpClient) { }

  private base = 'https://localhost:7275/api';

  all() {
    return this.http.get(this.base + '/citas/all');
  }

  muelles(): Observable<any>{
    return this.http.get(this.base + '/citas/muelles');
  }

  muelles_all(): Observable<any>{
    return this.http.get(this.base + '/citas/muelles_all');
  }

  tipoMuelles(){
    return this.http.get(this.base + '/citas/MuellesTipoCamion');
  }

  tipoVehiculos(){
    return this.http.get(this.base + '/citas/TipoCamion');
  }

  pedidos(){
    return this.http.get(this.base + '/citas/Pedidos');
  }

  citaPedidos(){
    return this.http.get(this.base + '/citas/CitasPedidos');
  }

  // getPedidoById(pedidoId: number): Observable<Pedido> {
  //   return this.http.get<Pedido>(`${this.base}/citas/pedidos/${pedidoId}`);
  // }


  franjas(){
    return this.http.get(this.base + '/citas/franjas');
  }

  comprobarReserva(reserva: ComprobarReserva){
    return this.http.post(this.base + '/citas/ComprobarReserva', reserva);
  }

  reservar(reserva: DatosReserva):  Observable<any>{

    return this.http.post(this.base + '/citas/Reservar', reserva);
  }

  subir_pedido(pedido: Pedido){
    return this.http.post(this.base + '/citas/SubirPedido', pedido);
  }

  AsociarCitaPedidos(AsociarCitaPedidos: AsociarCitaPedidos){
    return this.http.post(this.base + '/citas/AsociarCitaPedidos', AsociarCitaPedidos);
  }

  borrarMuelle(id: number): Observable<any> {
    return this.http.delete(this.base + `/citas/borrar/${id}`);
  }

  CrearMuelle(muelle: MuellesDTO) :  Observable<any> {
    return this.http.post(this.base + '/citas/crearMuelle', muelle);
  }

  actualizarMuelle(muelle: Muelles) :  Observable<any> {
    return this.http.post(this.base + '/citas/actualizarMuelle', muelle);
  }

  borrarCita(citaID: number): Observable<any> {
    return this.http.delete(this.base + `/citas/borrar_reserva/${citaID}`);
  }

  borrarCitasPorUsuario(usuario: string): Observable<any> {
    return this.http.delete(this.base + `/citas/borrar_reserva_por_usuario/${usuario}`);
  }
  
}

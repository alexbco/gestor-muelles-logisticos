// src/app/users/users.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IRegistro, Usuario  } from './Interfaces/usuario.interface';
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) { }

  private base = 'https://localhost:7275/api';

  all() {
    return this.http.get(this.base + '/usuarios/all');
  }

  getUsuariosConPerfiles(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.base + '/usuarios/UsuariosPerfiles');
  }

  // borrarUsuario(id: any){
  //   return this.http.post(this.base + '/usuarios/borrar/' + id);
  // }


  borrarUsuario(id: number): Observable<any> {
    const url = `${this.base}/usuarios/borrar/${id}`;
    return this.http.delete(url);
  }

  login(datos: any) {
    return this.http.post(this.base + '/usuarios/login', datos);
  }

  logout() {
    sessionStorage.removeItem('user'); 
    this.router.navigate(['/publico/pages/login']); 
  }

  registrar(user: IRegistro) :  Observable<any> {
    return this.http.post(this.base + '/usuarios/registrar', user);
  }

  actualizar(id: number, user: IRegistro): Observable<any> {
    return this.http.put(this.base + `/usuarios/actualizar/${id}`, user);
  }

}

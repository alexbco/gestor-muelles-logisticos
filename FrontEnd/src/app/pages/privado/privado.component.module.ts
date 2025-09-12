import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "src/app/shared/material/material.module";

import { PrivadoComponent } from "./privado.component";
import { PrivadoRoutingModule } from "./privado.component.routing";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";
import { HomeComponent } from "./home/home.component";
import { GestionUsuariosComponent } from "./gestion-usuarios/gestion-usuarios.component";
import { ConfiguracionComponent } from "./configuracion/configuracion.component";
import { CalendarioReservasComponent } from "./calendario-reservas/calendario-reservas.component";
import { DialogAnimationsExampleDialog } from "./gestion-usuarios/dialogs/borrar/borrar-usuarios-dialogos.component";
import { AgregarUsuarioDialogoComponent } from "./gestion-usuarios/dialogs/registrar/agregar-usuarios-dialogos.component";
import { ActualizarComponent } from "./gestion-usuarios/dialogs/actualizar/actualizar.component";
import { CrearReservaComponent } from "./calendario-reservas/components/crear-reserva/crear-reserva.component";
import { InformeReservasComponent } from "./calendario-reservas/components/informe-reservas/informe-reservas.component";
import { ReservarDialogoComponent } from "./calendario-reservas/components/crear-reserva/dialog/reservar/reservar-dialogos.component";
import { DescripcionMuellesComponent } from "./calendario-reservas/components/descripcion-muelles/descripcion-muelles.component";
import { ModificarMuelleDialogoComponent } from "./configuracion/dialogs/modificar_muelle/modificar_muelle-dialogos.component";
import { BorrarMuelleDialog } from "./configuracion/dialogs/borrar_muelle/borrar-muelle-dialogos.component";
import { CrearMuelleDialog } from "./configuracion/dialogs/crear_muelle/crear-muelle-dialogos.component";
import { BorrarAnimationsExampleDialog } from "./calendario-reservas/components/crear-reserva/dialog/borrar/borrar-usuarios-dialogos.component";
import { UnauthorizedComponent } from "../publico/Unauthorized/Unauthorized.component";
import { LoginGuardComponent } from "../publico/LoginGuard/LoginGuard.component";


@NgModule({
  declarations: [
    PrivadoComponent,
    SidebarComponent,
    HomeComponent,
    GestionUsuariosComponent,
    ConfiguracionComponent,
    CalendarioReservasComponent,
    DialogAnimationsExampleDialog,
    AgregarUsuarioDialogoComponent,
    ActualizarComponent,
    CrearReservaComponent,
    InformeReservasComponent,
    ReservarDialogoComponent,
    DescripcionMuellesComponent,
    ModificarMuelleDialogoComponent,
    BorrarMuelleDialog,
    CrearMuelleDialog,
    BorrarAnimationsExampleDialog,
    UnauthorizedComponent,
    LoginGuardComponent

  ],
  exports: [PrivadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PrivadoRoutingModule,
    MaterialModule,
  ]
})
export class PrivadoModule { }

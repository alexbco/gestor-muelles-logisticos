import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfiguracionComponent } from "./configuracion/configuracion.component";
import { CalendarioReservasComponent } from "./calendario-reservas/calendario-reservas.component";
import { GestionUsuariosComponent } from "./gestion-usuarios/gestion-usuarios.component";
import { HomeComponent } from "./home/home.component";
import { PrivadoComponent } from "./privado.component";
import { UnAuthorizedOperarioGuard } from "src/app/guards/role-operario-guard.guard";
import { UnAuthorizedAdminGuard } from "src/app/guards/role-admin-guard.guard";


const appRoutes = [
  {
    path: "", component: PrivadoComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "gestion-usuarios", component: GestionUsuariosComponent, canActivate: [UnAuthorizedAdminGuard] },
      { path: "calendario-reservas", component: CalendarioReservasComponent },
      { path: "configuracion", component: ConfiguracionComponent, canActivate: [UnAuthorizedOperarioGuard] },
      { path: "**", redirectTo: "home"}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
})
export class PrivadoRoutingModule { }
import { RouterModule } from "@angular/router";
import { LoginGuard } from "./guards/login-guard.guard";
import { LoginComponent } from "./pages/publico/login/login.component";
import { LoginGuardComponent } from "./pages/publico/LoginGuard/LoginGuard.component";
import { UnauthorizedComponent } from "./pages/publico/Unauthorized/Unauthorized.component";


const appRoutes = [
  {
    path: "publico/pages/login", component: LoginComponent
  },
  {
    path: "privado/pages",
    loadChildren: () => import('./pages/privado/privado.component.module').then(m => m.PrivadoModule), canActivate: [LoginGuard]
  },
  {
    path: "publico/pages/unauthorized", component: UnauthorizedComponent
  },
  {
    path: "publico/pages/unlog", component: LoginGuardComponent
  },
  {
    path: "**", redirectTo: "publico/pages/login"
  }

];
export const routing = RouterModule.forRoot(appRoutes);
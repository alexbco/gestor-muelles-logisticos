import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { UsersService } from "../../../services/users.service";
import { ParticlesConfig } from '../../../particles-config';
import { MatSnackBar } from "@angular/material/snack-bar";

declare let particlesJS: any; // Required to be properly interpreted by TypeScript.

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = "";
  password: string = "";
  hide = true;
  errorMessage: string = "";
  private particlesInstance: any;

  constructor(
    public userService: UsersService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.invokeParticles();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.particlesInstance) {
        this.particlesInstance.destroy(); // Destruye la instancia de Particles.js al cambiar de página
      }
    });
  }

  ngOnDestroy() {
    if (this.particlesInstance) {
      this.particlesInstance.destroy(); // Destruye la instancia de Particles.js al salir de la página
    }
  }

  invokeParticles(): void {
    this.particlesInstance = particlesJS('particles-js', ParticlesConfig, function() {});
  }
  login() {
    const user = { email: this.email, password: this.password };

    this.userService.login(user).subscribe(
      (response: any) => {
        // Almacenar el usuario en el SessionStorage
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(["privado/pages/home"]);
      },
      (error: any) => {
        const mensajeError = "Error en el inicio de sesión. Verifica tus credenciales.";
        this.snackBar.open(mensajeError, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    );
  }
}

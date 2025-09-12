// register.component.ts

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../../../services/users.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]

})
export class RegisterComponent {
  nombre: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(public userService: UsersService, public router: Router) { }

  // register() {
  //   const user = { usuario: this.nombre, email: this.email, password: this.password };

  //   this.userService.register(user).subscribe(() => {
  //     this.router.navigateByUrl("home");
  //     console.log("registrando...");
  //   });
  
  // }
}
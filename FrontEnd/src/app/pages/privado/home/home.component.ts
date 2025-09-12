// src/app/home/home.component.ts

import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  hide = true;
  userString = sessionStorage.getItem('user');
  user = this.userString ? JSON.parse(this.userString) : null;
  perfilID = this.user.perfilID;
  videoLoaded = false;
  isPageReloaded = false;


  constructor(public userService: UsersService) {}
  ngOnInit() {
    if (!sessionStorage.getItem('isPageReloaded')) {
      sessionStorage.setItem('isPageReloaded', 'true');
      setTimeout(() => {
        location.reload();
      }, 500); // Retraso de 0.5 segundos (500 milisegundos)
    } else {
      sessionStorage.removeItem('isPageReloaded');
    }
  }
  
}
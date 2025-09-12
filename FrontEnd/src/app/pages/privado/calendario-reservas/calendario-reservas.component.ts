// src/app/home/home.component.ts

import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { UsuarioToken } from "src/app/services/Interfaces/usuario.interface";
import { UsersService } from "../../../services/users.service";

@Component({
  selector: "app-calendario-reservas",
  templateUrl: "./calendario-reservas.component.html",
  styleUrls: ["./calendario-reservas.component.css"],
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
export class CalendarioReservasComponent implements OnInit {

  user: UsuarioToken;
  selected: Date;
  minDate: Date;

  ngOnInit() {}
  
  constructor(private dateAdapter: DateAdapter<Date>,public userService: UsersService) {
    this.selected = new Date();
    this.minDate = new Date();
    this.dateAdapter.setLocale('en'); // Set your desired locale
    this.user = JSON.parse(sessionStorage.getItem("user")!);
  }
}
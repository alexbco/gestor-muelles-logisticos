// src/app/home/home.component.ts

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-privado",
  templateUrl: "./privado.component.html",
  styleUrls: ["./privado.component.css"]
})
export class PrivadoComponent implements OnInit {
  sidebarCollapsed = true;
  hide = true;

  constructor() {
    
  }
  ngOnInit() {}
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.hide = !this.hide;

  }
  
}

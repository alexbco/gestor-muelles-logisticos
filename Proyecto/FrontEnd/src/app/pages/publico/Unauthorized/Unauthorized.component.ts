import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-Unauthorized',
  templateUrl: './Unauthorized.component.html',
  styleUrls: ['./Unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(
    private userService: UsersService,
    private location: Location
  ) { }

  cerrarSesion(): void {
    this.userService.logout();
  }

  volver(): void {
    history.back();
  }
}

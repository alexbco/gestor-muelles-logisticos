import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-LoginGuard',
  templateUrl: './LoginGuard.component.html',
  styleUrls: ['./LoginGuard.component.css']
})
export class LoginGuardComponent{

  constructor(private UserService: UsersService) { }

  iniciarSesion(): void {
    this.UserService.logout();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioRegistrado, UsuarioToken } from 'src/app/services/Interfaces/usuario.interface';
import { UsersService } from 'src/app/services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  user: UsuarioRegistrado;
  activeOption: string;
  isNavbarCollapsed: boolean;
  showFiller = false;

  constructor(private router: Router, private UserService: UsersService,private cookieService: CookieService) {
    this.activeOption = 'home';
    this.isNavbarCollapsed = true;
    this.user = JSON.parse(sessionStorage.getItem("user")!);
  }

  @Output() menuOptionSelected: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.updateActiveOption(currentRoute);
      }
    });
  }

  private updateActiveOption(route: string): void {
    // Establecer la opción activa según la ruta
    if (route === '/home') {
      this.activeOption = 'home';
    } else if (route === '/calendario-reservas') {
      this.activeOption = 'calendario-reservas';
    } else if (route === '/configuracion') {
      this.activeOption = 'configuracion';
    } else if (route === '/informe-reservas') {
      this.activeOption = 'informe-reservas';
    } else if (route === '/gestion-usuarios') {
      this.activeOption = 'gestion-usuarios';
    }
  }

  selectMenuOption(): void {
    this.menuOptionSelected.emit();
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/publico/pages/login']);
  }
}

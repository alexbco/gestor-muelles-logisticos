import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})

export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    const user = sessionStorage.getItem('user');

    if (user) {
      return true;
    }

    this.router.navigate(['/publico/pages/unlog']); 
    return false;

  }

}

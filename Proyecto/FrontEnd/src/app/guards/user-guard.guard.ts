import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const token = localStorage.getItem('token');

    // if (token) {
    //   return true;
    // }

    // this.router.navigate(['']);
    // return false;

    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UnLoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    const user = sessionStorage.getItem('user');

    if (user) {
      return false;
    }

    this.router.navigate(['/']);
    return true;

  }
  

}

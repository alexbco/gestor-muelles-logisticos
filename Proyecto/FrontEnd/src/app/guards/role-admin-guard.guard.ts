import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UnAuthorizedAdminGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
  
    if (user.perfilID > 1) {
      this.router.navigate(['/publico/pages/unauthorized']); 
      return false;
    }
  
    return true;
  }

}

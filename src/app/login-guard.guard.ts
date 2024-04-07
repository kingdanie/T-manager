// import { CanActivateFn } from '@angular/router';

// export const loginGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class loginGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // If the user is already logged in, redirect to the dashboard or any other page
      this.router.navigate(['/dashboard']); // Change '/dashboard' to the desired page
      return false;
    } else {
      // If the user is not logged in, allow them to access the login page
      return true;
    }
  }
}

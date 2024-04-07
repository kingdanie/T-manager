// import { CanActivateFn } from '@angular/router';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//    return true;
// };



import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        // Redirect to the login page if the user is not logged in
        this.router.navigate(['/login']);
        return false;
      }
  
  }
}

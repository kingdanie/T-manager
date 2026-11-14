import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from './services/auth-service';

export const loginGuardGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Redirect already authenticated users to the dashboard
    return router.parseUrl('/dashboard');
  }

  // Allow access to the login page if not logged in
  return true;
};
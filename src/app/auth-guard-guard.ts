import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from './services/auth-service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If you used the signal-based isLoggedIn() computed signal from earlier:
  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login if not authenticated
  return router.parseUrl('/login');
};
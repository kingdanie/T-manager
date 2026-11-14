import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth-service';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // During Server-Side Rendering (SSR), bypass the guard so the server doesn't 
  // prematurely redirect before the browser can read localStorage.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Once in the browser, check the signal state normally
  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login if unauthenticated
  return router.parseUrl('/login');
};
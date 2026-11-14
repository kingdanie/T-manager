import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // 1. Private writable signal initialized with stored user data (safe for SSR)
  private currentUserState = signal<any | null>(this.getStoredUser());

  // 2. Public read-only signal for components to consume
  readonly currentUser = this.currentUserState.asReadonly();

  // 3. Computed signal that updates automatically when currentUser changes
  readonly isLoggedIn = computed(() => !!this.currentUserState());

  constructor() {
    if (this.isBrowser && !localStorage.getItem('users')) {
      this.localStorageService.initializeLocalStorage();
    }
  }

  private getStoredUser(): any | null {
    if (!this.isBrowser) return null;
    
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  getUserByUsername(username: string): Observable<any | null> {
    if (!this.isBrowser) return of(null);

    const users: any[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.username === username);
    return of(user || null);
  }

  // Helper method when logging a user in to update the signal
  login(user: any): void {
    if (this.isBrowser) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
    this.currentUserState.set(user);
    this.router.navigate(['/dashboard']);
  }

  logOut(): void {
    if (this.isBrowser) {
      localStorage.removeItem('userInfo');
    }
    this.currentUserState.set(null); // Clears the signal state immediately
    this.router.navigate(['/login']);
  }
}
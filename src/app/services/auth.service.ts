import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {
    if (!localStorage.getItem('users')) {
      this.localStorageService.initializeLocalStorage();
    }
  }

  // getUserByUsername(username: string): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:3000/users?username=${username}`);
  // }

  getUserByUsername(username: string): Observable<any> {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Filter the users array to find the user with the specified username
    const user = users.find((user: any) => user.username === username);
    // Return the user if found, otherwise return null
    return of(user);
  }

  logOut() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  getUserByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/users?username=${username}`);
  }

  logOut() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}



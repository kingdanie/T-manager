import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http: HttpClient) { }

  initializeLocalStorage(): void {
    // Fetch data from db.json and store it in localStorage if tasks and users data are missing
    if (!localStorage.getItem('tasks') || !localStorage.getItem('users')) {
      this.http.get<any>('assets/db.json').subscribe(data => {
        localStorage.setItem('tasks', JSON.stringify(data.tasks));
        localStorage.setItem('users', JSON.stringify(data.users));
      });
    }
  }
}

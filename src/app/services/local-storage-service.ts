import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';

interface DbSchema {
  tasks: Task[];
  users: any[];
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  initializeLocalStorage(): void {
    // Skip if running on the server
    if (!this.isBrowser) {
      return;
    }

    // Fetch data from db.json and store it in localStorage if tasks or users data are missing
    if (!localStorage.getItem('tasks') || !localStorage.getItem('users')) {
      this.http.get<DbSchema>('db.json').subscribe({
        next: (data) => {
          localStorage.setItem('tasks', JSON.stringify(data.tasks ?? []));
          localStorage.setItem('users', JSON.stringify(data.users ?? []));
        },
        error: (err) => console.error('Failed to initialize localStorage from db.json', err)
      });
    }
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from '../interfaces/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private apiUsersUrl = 'http://localhost:3000/users';

  
  private _task!: Task;

    // Create a subject to emit events when data is updated
    private dataUpdateSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl+'?_sort=dueDate');
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUsersUrl);
  }



  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, newTask).pipe(
      tap(() => this.dataUpdateSubject.next())
    );
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const updateUrl = `${this.apiUrl}/${updatedTask.id}`;
    return this.http.patch<Task>(updateUrl, updatedTask).pipe(
      tap(() => this.dataUpdateSubject.next())
    );
  }

  getSelectedTask(): Task {
    return this._task;
  }

  selectTask(task: Task) {
    this._task = task;
    this.saveTasksToLocalStorage();
    
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('task', JSON.stringify(this._task));
  }

  deleteTask() {
    return this.http.delete<void>(`${this.apiUrl}/${this._task.id}`).pipe(
      // Use tap to emit an event when the delete is successful
      tap(() => this.dataUpdateSubject.next())
    );
  }

    // Observable to subscribe to for data update events
    onDataUpdate(): Observable<void> {
      return this.dataUpdateSubject.asObservable();
    }

}

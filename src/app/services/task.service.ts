import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task } from '../interfaces/task.model';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dataUpdateSubject = new Subject<void>();


  private _task!: Task;
  
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    // Check if there is no data in localStorage, then initialize it with data from db.json
    if (!localStorage.getItem('tasks')) {
      this.localStorageService.initializeLocalStorage();
    }
  }


  getTasks(): Observable<Task[]> {
    return of(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }

  getUsers(): Observable<any[]> {
    return of(JSON.parse(localStorage.getItem('users') || '[]'));
  }

  addTask(newTask: Task): Observable<Task> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.dataUpdateSubject.next();
    return of(newTask);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.findIndex((task: Task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.dataUpdateSubject.next();
      return of(updatedTask);
    } else {
      return of();
    }
  }

  deleteTask(): Observable<void> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.findIndex((task: Task) => task.id ===  this._task.id);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.dataUpdateSubject.next();
      return of();
    } else {
      this.dataUpdateSubject.next();
      return of();
    }
  }

  selectTask(task: Task) {
    this._task = task;
    localStorage.setItem('selectedTask', JSON.stringify(task));
  }

  getSelectedTask(): Task {
    const taskJson = localStorage.getItem('selectedTask');
    return taskJson ? JSON.parse(taskJson) : [];
  }

  onDataUpdate(): Observable<void> {
    return this.dataUpdateSubject.asObservable();
  }
}

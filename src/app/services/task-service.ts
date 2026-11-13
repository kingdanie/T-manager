import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Private writable signals
  private tasksState = signal<Task[]>([]);
  private usersState = signal<any[]>([]);
  private selectedTaskState = signal<Task | null>(null);

  // Public read-only signals for components to consume directly
  readonly tasks = this.tasksState.asReadonly();
  readonly users = this.usersState.asReadonly();
  readonly selectedTask = this.selectedTaskState.asReadonly();

  constructor() {
    // Only interact with localStorage if running in the browser
    if (this.isBrowser) {
      if (!localStorage.getItem('tasks')) {
        this.localStorageService.initializeLocalStorage();
      }
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;

    this.tasksState.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
    this.usersState.set(JSON.parse(localStorage.getItem('users') || '[]'));
    
    const savedSelection = localStorage.getItem('selectedTask');
    if (savedSelection) {
      try {
        this.selectedTaskState.set(JSON.parse(savedSelection));
      } catch {
        this.selectedTaskState.set(null);
      }
    }
  }

  addTask(newTask: Task): Task {
    const currentTasks = this.tasksState();
    const taskWithId: Task = { ...newTask, id: currentTasks.length + 1 };
    
    const updatedTasks = [...currentTasks, taskWithId];
    this.tasksState.set(updatedTasks);
    
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    
    return taskWithId;
  }

  updateTask(updatedTask: Task): void {
    const updatedTasks = this.tasksState().map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksState.set(updatedTasks);
    
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }

  deleteTask(): void {
    const currentSelected = this.selectedTaskState();
    if (!currentSelected) return;

    const updatedTasks = this.tasksState().filter(
      (task) => task.id !== currentSelected.id
    );
    this.tasksState.set(updatedTasks);
    
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      localStorage.removeItem('selectedTask');
    }
    this.selectedTaskState.set(null);
  }

  selectTask(task: Task): void {
    this.selectedTaskState.set(task);
    if (this.isBrowser) {
      localStorage.setItem('selectedTask', JSON.stringify(task));
    }
  }
}
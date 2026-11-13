import { Service, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task';
import { LocalStorageService } from './local-storage-service';

@Service()
export class TaskService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  // Private writable signals
  private tasksState = signal<Task[]>([]);
  private usersState = signal<any[]>([]);
  private selectedTaskState = signal<Task | null>(null);

  // Public read-only signals for components to consume directly
  readonly tasks = this.tasksState.asReadonly();
  readonly users = this.usersState.asReadonly();
  readonly selectedTask = this.selectedTaskState.asReadonly();

  constructor() {
    if (!localStorage.getItem('tasks')) {
      this.localStorageService.initializeLocalStorage();
    }
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    this.tasksState.set(JSON.parse(localStorage.getItem('tasks') || '[]'));
    this.usersState.set(JSON.parse(localStorage.getItem('users') || '[]'));
    
    const savedSelection = localStorage.getItem('selectedTask');
    if (savedSelection) {
      this.selectedTaskState.set(JSON.parse(savedSelection));
    }
  }

  addTask(newTask: Task): Task {
    const currentTasks = this.tasksState();
    const taskWithId: Task = { ...newTask, id: currentTasks.length + 1 };
    
    const updatedTasks = [...currentTasks, taskWithId];
    this.tasksState.set(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    return taskWithId;
  }

  updateTask(updatedTask: Task): void {
    const updatedTasks = this.tasksState().map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksState.set(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  deleteTask(): void {
    const currentSelected = this.selectedTaskState();
    if (!currentSelected) return;

    const updatedTasks = this.tasksState().filter(
      (task) => task.id !== currentSelected.id
    );
    this.tasksState.set(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  selectTask(task: Task): void {
    this.selectedTaskState.set(task);
    localStorage.setItem('selectedTask', JSON.stringify(task));
  }
}
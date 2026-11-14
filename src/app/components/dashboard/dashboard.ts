import { Component, inject, OnInit, computed } from '@angular/core';
import { Nagivation } from '../nagivation/nagivation';
import { DatePipe, CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private taskService = inject(TaskService);

  user: any = null;
  currentDate = new Date();

  // Using computed signals to automatically sort and slice tasks/users reactively
  latestTasks = computed(() => {
    const tasks = this.taskService.tasks();
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  });

  latestUsers = computed(() => {
    return this.taskService.users().slice(0, 4);
  });

  ngOnInit(): void {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
  }
}
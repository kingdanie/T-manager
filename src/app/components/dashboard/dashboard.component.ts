import { Component } from '@angular/core';
import { NagivationComponent } from '../nagivation/nagivation.component';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NagivationComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user!: any
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      try {
        // Attempt to parse JSON data
        this.user = JSON.parse(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
    this.loadTasks();
    this.loadUsers();

    this.taskService.onDataUpdate().subscribe(() => {
      this.loadTasks();
    });
  }
  latestTasks: Task[] = [];
  latestUsers: any[] = [];
  currentDate = new Date();

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      // Filter tasks into different arrays based on status
      this.latestTasks = tasks.slice(0, 4); // Display the first 5 tasks
      // console.log(tasks);
    });
  }

  loadUsers(): void {
    this.taskService.getUsers().subscribe(users => {
      // Filter tasks into different arrays based on status
      this.latestUsers = users.slice(0, 4); // Display the first 5 tasks
      // console.log(tasks);
    });
  }


}

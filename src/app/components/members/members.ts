import { Component, inject, OnInit } from '@angular/core';
import { PageHeader } from '../page-header/page-header';
import { TaskService } from '../../services/task-service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, PageHeader],
  selector: 'app-members',
  styleUrl: './members.css',
  templateUrl: './members.html',
})
export class Members implements OnInit {
  private taskService = inject(TaskService);

  members: any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    // Read directly from the signal exposed by TaskService
    this.members = this.taskService.users();
  }

  deleteUser(userId: string): void {
    this.members = this.members.filter((member) => member.id !== userId);
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal-service';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task-service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, MatIconModule],
  selector: 'app-task-modal',
  styleUrl: './task-modal.css',
  templateUrl: './task-modal.html',
})
export class TaskModal implements OnInit {
  public modalService = inject(ModalService);
  private taskService = inject(TaskService);

  TaskItem!: Task;

  ngOnInit(): void {
    // Access the selectedTask signal
    const currentTask = this.taskService.selectedTask();
    if (currentTask) {
      this.TaskItem = currentTask;
    }
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  deleteModal(): void {
    this.modalService.openDeleteTaskModal();
  }

  editTask(): void {
    this.modalService.openEditTaskModal();
  }
}
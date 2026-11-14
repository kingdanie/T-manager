import { Component, inject, input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { ModalService } from '../../services/modal-service';
import { TaskService } from '../../services/task-service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  imports: [MatIconModule, MatTooltipModule],
  selector: 'app-task',
  styleUrl: './task.css',
  templateUrl: './task.html',
})
export class TaskComponent {
  // Field-level dependency injection
  public modalService = inject(ModalService);
  public taskService = inject(TaskService);

  // Signal-based required input (replaces @Input() task!: Task)
  task = input.required<Task>();

  viewTask(task: Task): void {
    this.taskService.selectTask(task);
    this.modalService.openTaskModal();
  }

  getExclamationCount(priority: string): number[] {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return [1, 2, 3]; // Three red exclamation marks
      case 'moderate':
        return [1, 2]; // Two yellow exclamation marks
      case 'low':
        return [1]; // One blue exclamation mark
      default:
        return []; // No exclamation marks for other priorities
    }
  }
}
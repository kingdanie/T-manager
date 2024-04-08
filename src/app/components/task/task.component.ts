import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.model';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faCalendarAlt, faExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  faCalendar = faCalendarAlt;
  faExclamation = faExclamation;

  @Input()
  task!: Task;

  constructor(public modalService: ModalService, public taskService: TaskService) {}

  viewTask(task: Task) {
    this.taskService.selectTask(task);
    this.modalService.openTaskModal();
  }

  getExclamationCount(priority: string): number[] {
    switch (priority.toLowerCase()) {
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

import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.model';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  faCalendar = faCalendarAlt;
  @Input()
  task!: Task;

  constructor(public modalService: ModalService, public taskService: TaskService) {}

  viewTask(task: Task) {
    this.taskService.selectTask(task);
    this.modalService.openTaskModal();
  }
}

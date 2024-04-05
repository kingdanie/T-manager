import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.model';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input()
  task!: Task;

  constructor(public modalService: ModalService, public taskService: TaskService) {}

  viewTask(task: Task) {
    this.taskService.selectTask(task);
    this.modalService.openTaskModal();
  }
}

import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Task } from '../../interfaces/task.model';
import { TaskService } from '../../services/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDay, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {

  TaskItem! : Task;

  constructor(public modalService: ModalService, private taskService : TaskService) {}
  faTrash = faTrash;
  faTimes = faTimes;
  faCalendarDay = faCalendarDay;
  closeModal(){
    this.modalService.closeModal();
  }

  deleteModal() {
    this.modalService.openDeleteTaskModal();
  }

  editTask() {
    this.modalService.openEditTaskModal();
  }

ngOnInit() {
  this.TaskItem = this.taskService.getSelectedTask()
}
}

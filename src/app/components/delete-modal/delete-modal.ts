import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal-service';
import { TaskService } from '../../services/task-service';

@Component({
  imports: [],
  selector: 'app-delete-modal',
  styleUrl: './delete-modal.css',
  templateUrl: './delete-modal.html',
})
export class DeleteModal {
  public modalService = inject(ModalService);
  private _taskService = inject(TaskService);

  dismiss(): void {
    this.modalService.deleteTaskModal = false;
  }

  confirmDelete(): void {
    this._taskService.deleteTask();
    this.modalService.closeModal();
  }
}
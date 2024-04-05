import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})

export class DeleteModalComponent {

  constructor( public modalService: ModalService, private _taskService: TaskService) {}

  dismiss(){
    this.modalService.deleteTaskModal = false;
  }

  confirmDelete() {
    this._taskService.deleteTask().subscribe();
    this.modalService.closeModal();
  }

}

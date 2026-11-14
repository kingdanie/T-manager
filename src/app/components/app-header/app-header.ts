import { Component } from '@angular/core';
import { ModalService } from '../../services/modal-service';

@Component({
  imports: [],
  selector: 'app-app-header',
  standalone: true,
  styleUrl: './app-header.css',
  templateUrl: './app-header.html',
})
export class AppHeader {

  constructor( private _modalService : ModalService) {}

  addNewTask() {
      this._modalService.openCreateTaskModal();
  }
}

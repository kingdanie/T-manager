import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../components/sidebar/sidebar';
import { Navbar } from '../components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { TaskModal } from '../components/task-modal/task-modal';
import { DeleteModal } from '../components/delete-modal/delete-modal';
import { CreateModal } from '../components/create-modal/create-modal';
import { EditModal } from '../components/edit-modal/edit-modal';
import { ModalService } from '../services/modal-service';

@Component({
  imports: [
    RouterOutlet,
    Sidebar,
    Navbar,
    CommonModule,
    TaskModal,
    DeleteModal,
    CreateModal,
    EditModal,
  ],
  selector: 'app-internallayout',
  styleUrl: './internallayout.css',
  templateUrl: './internallayout.html',
})
export class Internallayout {
  public modalService = inject(ModalService);
}
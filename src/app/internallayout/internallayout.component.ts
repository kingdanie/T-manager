import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from "../components/task-modal/task-modal.component";
import { DeleteModalComponent } from "../components/delete-modal/delete-modal.component";
import { CreateModalComponent } from "../components/create-modal/create-modal.component";
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'app-internallayout',
    standalone: true,
    templateUrl: './internallayout.component.html',
    styleUrl: './internallayout.component.css',
    imports: [RouterOutlet, SidebarComponent, NavbarComponent, CommonModule, TaskModalComponent, DeleteModalComponent, CreateModalComponent, EditModalComponent]
})
export class InternallayoutComponent {
    constructor(
        public modalService: ModalService
      ) {}

}



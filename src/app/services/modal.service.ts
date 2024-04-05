import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  taskModal = false;
  editTaskModal = false;
  createTaskModal = false;
  deleteTaskModal = false;

  openTaskModal(){
    this.taskModal = true;
  }
  openEditTaskModal(){
    this.taskModal = false;
    this.editTaskModal = true;
  }
  openCreateTaskModal(){
    this.taskModal = false;
    this.createTaskModal = true;
  }
  openDeleteTaskModal() {
    //this.taskModal = false;
    this.deleteTaskModal = true;
  }

 

  closeModal(){
    this.taskModal = false;
    this.editTaskModal = false;
    this.createTaskModal = false;
    this.deleteTaskModal = false;
  }


}

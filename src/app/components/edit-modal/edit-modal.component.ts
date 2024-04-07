import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../interfaces/task.model';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {
 
  faTimes = faTimes;

  constructor(private fb: FormBuilder, private _modalService: ModalService, private _taskService: TaskService) {}

  healthTask!: Task;
  taskForm!: FormGroup;

  onEdit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this._taskService.updateTask(newTask).subscribe(() => {
        // Handle success, reset form, close modal, etc.
        this.taskForm.reset();
        this._modalService.closeModal();
      });
    }
  }

  dismiss(){
    this._modalService.closeModal();
  }

  ngOnInit() {
    this.healthTask = this._taskService.getSelectedTask();
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      id: [this.healthTask.id],
      title: [this.healthTask.title, [Validators.required, Validators.maxLength(50)]],
      description: [this.healthTask.description, [Validators.required, Validators.maxLength(200)]],
      dueDate: [this.healthTask.dueDate, [Validators.required]],
      status: [this.healthTask.status, [Validators.required]],
    });
  }

}

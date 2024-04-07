import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TaskService } from '../../services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.css'
})
export class CreateModalComponent {

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      dueDate: ['', [Validators.required]],
      status: ['Open', [Validators.required]],
    });
  }


dismiss() {
  this.modalService.closeModal();
}


  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      // Add the current timestamp to the createdAt property
      newTask.createdAt = new Date().toISOString();
      this.taskService.addTask(newTask).subscribe(() => {
        // Handle success, reset form, close modal, etc.
        this.taskForm.reset();
        this.modalService.createTaskModal = false;
      });
    }
  }

}

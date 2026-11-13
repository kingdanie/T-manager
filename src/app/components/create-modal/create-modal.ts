import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './create-modal.css',
  templateUrl: './create-modal.html',
})
export class CreateModal implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private modalService = inject(ModalService);

  taskForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      dueDate: ['', [Validators.required]],
      status: ['Open', [Validators.required]],
    });
  }

  dismiss(): void {
    this.modalService.closeModal();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        createdAt: new Date().toISOString(),
        priority: 'moderate',
      };

      // Call addTask directly without .subscribe()
      this.taskService.addTask(newTask);

      // Reset form and close modal immediately
      this.taskForm.reset();
      this.modalService.createTaskModal = false;
    }
  }
}
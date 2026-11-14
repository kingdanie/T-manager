import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../interfaces/task';
import { ModalService } from '../../services/modal-service';
import { TaskService } from '../../services/task-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  selector: 'app-edit-modal',
  styleUrl: './edit-modal.css',
  templateUrl: './edit-modal.html',
})
export class EditModal implements OnInit {
  private fb = inject(FormBuilder);
  private _modalService = inject(ModalService);
  private _taskService = inject(TaskService);


  healthTask!: Task;
  taskForm!: FormGroup;

  ngOnInit(): void {
    // If getSelectedTask() is a method returning a Task or null:
    const selected = this._taskService.selectedTask?.();
    if (selected) {
      this.healthTask = selected;
    }
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      id: [this.healthTask?.id],
      title: [this.healthTask?.title || '', [Validators.required, Validators.maxLength(50)]],
      description: [this.healthTask?.description || '', [Validators.required, Validators.maxLength(200)]],
      dueDate: [this.healthTask?.dueDate || '', [Validators.required]],
      status: [this.healthTask?.status || 'Open', [Validators.required]],
    });
  }

  onEdit(): void {
    if (this.taskForm.valid) {
      const updatedTask = this.taskForm.value;
      
      // Call updateTask synchronously to match your signal-based service architecture
      this._taskService.updateTask(updatedTask);
      
      this.taskForm.reset();
      this._modalService.closeModal();
    }
  }

  dismiss(): void {
    this._modalService.closeModal();
  }
}
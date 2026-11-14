import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Task } from '../../interfaces/task';
import { 
  CdkDragDrop, 
  moveItemInArray, 
  transferArrayItem,  
  CdkDrag,
  CdkDropList,
  CdkDropListGroup, 
} from '@angular/cdk/drag-drop';
import { TaskComponent } from '../task/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  imports: [
    CommonModule, 
    TaskComponent, 
    CdkDropListGroup, 
    CdkDropList, 
    CdkDrag, 
    FormsModule,
    NgSelectComponent,
  ],
  selector: 'app-kanban-board',
  standalone: true,
  styleUrl: './kanban-board.css',
  templateUrl: './kanban-board.html',
})
export class KanbanBoard implements OnInit {
  private taskService = inject(TaskService);

  statusQuery = signal<string | null>(null);

  // Reactive columns using Angular computed signals based on the service's task signal
  openTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const filtered = tasks.filter(task => task.status === 'Open');
    return this.applyPriorityFilter(filtered);
  });

  pendingTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const filtered = tasks.filter(task => task.status === 'Pending');
    return this.applyPriorityFilter(filtered);
  });

  inProgressTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const filtered = tasks.filter(task => task.status === 'In Progress');
    return this.applyPriorityFilter(filtered);
  });

  completedTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const filtered = tasks.filter(task => task.status === 'Completed');
    return this.applyPriorityFilter(filtered);
  });

  ngOnInit(): void {
    // With signals, initial loading happens automatically through the service
  }

  // private applyPriorityFilter(tasks: Task[]): Task[] {
  //   if (!this.statusQuery || this.statusQuery.toLowerCase() === 'priority') {
  //     return tasks;
  //   }
  //   const filterStatus = this.statusQuery.toLowerCase();
  //   return tasks.filter(task => task.priority?.toLowerCase() === filterStatus);
  // }

  private applyPriorityFilter(tasks: Task[]): Task[] {
  const priority = this.statusQuery();

  if (!priority) {
    return tasks;
  }

  return tasks.filter(
    task => task.priority?.toLowerCase() === priority.toLowerCase()
  );
}

  // Kept as an empty method or trigger if bound directly to ng-select change events
  filterTasks(): void {
    // Triggers reactivity automatically since statusQuery changes or can be used to trigger updates
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the task status based on the column and persist via service
      const updatedTask = event.container.data[event.currentIndex];
      updatedTask.status = this.getColumnStatus(event.container.id);
      
      this.taskService.updateTask(updatedTask);
    }
  }

  private getColumnStatus(columnId: string): string {
    switch (columnId) {
      case 'openTasks': return 'Open';
      case 'pendingTasks': return 'Pending';
      case 'inProgressTasks': return 'In Progress';
      case 'completedTasks': return 'Completed';
      default: return '';
    }
  }
}
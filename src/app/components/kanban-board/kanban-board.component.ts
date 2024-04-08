import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem,  CdkDrag,
  CdkDropList,
  CdkDropListGroup, } from '@angular/cdk/drag-drop';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [TaskComponent, CdkDropListGroup, CdkDropList, CdkDrag, CommonModule, NgSelectModule, FormsModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent {
  openTasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  statusQuery: string = 'Priority';
  ngOnInit(): void {
    this.loadTasks();

    this.taskService.onDataUpdate().subscribe(() => {
      this.loadTasks();
    });
  }

  filterTasks() {
    this.loadTasks(); // This reloads all tasks without filtering
    if (this.statusQuery && this.statusQuery.toLocaleLowerCase() !== "priority") {
      const filterStatus = this.statusQuery.toLowerCase();
      this.openTasks = this.openTasks.filter(task => task.priority.toLowerCase() === filterStatus);
      this.pendingTasks = this.pendingTasks.filter(task => task.priority.toLowerCase() === filterStatus);
      this.inProgressTasks = this.inProgressTasks.filter(task => task.priority.toLowerCase() === filterStatus);
      this.completedTasks = this.completedTasks.filter(task => task.priority.toLowerCase() === filterStatus);
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      // Filter tasks into different arrays based on status
      this.openTasks = tasks.filter(task => task.status === 'Open'); // Display the first 5 tasks
      this.pendingTasks = tasks.filter(task => task.status === 'Pending');
      this.inProgressTasks = tasks.filter(task => task.status === 'In Progress');
      this.completedTasks = tasks.filter(task => task.status === 'Completed');
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      // Move within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move to a different column
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      // Update the task status based on the column
      const updatedTask = event.container.data[event.currentIndex];
      updatedTask.status = this.getColumnStatus(event.container.id);
      console.log(updatedTask);
      this.taskService.updateTask(updatedTask).subscribe();
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

import { Component } from '@angular/core';
import { PageHeaderComponent } from "../page-header/page-header.component";
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-members',
    standalone: true,
    templateUrl: './members.component.html',
    styleUrl: './members.component.css',
    imports: [PageHeaderComponent]
})
export class MembersComponent {


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  members: any[] = [];

  getUsers () {
    this.taskService.getUsers().subscribe(users => this.members = users)
  }
}

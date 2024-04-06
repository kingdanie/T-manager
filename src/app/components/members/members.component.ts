import { Component } from '@angular/core';
import { PageHeaderComponent } from "../page-header/page-header.component";

@Component({
    selector: 'app-members',
    standalone: true,
    templateUrl: './members.component.html',
    styleUrl: './members.component.css',
    imports: [PageHeaderComponent]
})
export class MembersComponent {

}

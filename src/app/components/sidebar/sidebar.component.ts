import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


interface NavBarItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    imports: [RouterModule, CommonModule]
})
export class SidebarComponent {


  navbar_items: NavBarItem[] = [
    {
      label: 'Home',
      icon: '/assets/icons/dashboard-icon.svg',
      link: '/dashboard',
    },
    {
      label: 'Tasks',
      icon: '/assets/icons/calendar.svg',
      link: '/dashboard/tasks',
    },
    {
      label: 'Members',
      icon: '/assets/icons/members.svg',
      link: '/dashboard/members',
    },
    {
      label: 'Settings',
      icon: '/assets/icons/settings.svg',
      link: '/dashboard/settings',
    },
    
  ];


}


import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MobilemenuService } from '../../mobilemenu.service';

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
    imports: [RouterModule, CommonModule, FontAwesomeModule]
})
export class SidebarComponent {
  faTimes = faTimes;

  constructor(private mobileMenuService: MobilemenuService) {}

  isMobileMenu!: boolean;

  ngOnInit() {
    // Or directly set the initial value from the service
    // this.isMobileMenu = this.mobileMenuService.isMobileMenuOpen;
     // Option 1: Subscribe and store the initial value
     this.mobileMenuService.isMobileMenuOpen$.subscribe(isOpen => {
      this.isMobileMenu = isOpen;
    });

    // Option 2: Subscribe and react dynamically (without storing)
    this.mobileMenuService.isMobileMenuOpen$.subscribe(isOpen => {
      // Perform actions based on the current isMobileMenuOpen value
      console.log('Mobile menu open:', isOpen);
    });
  }
  

  toggleSideMenu() {
    this.mobileMenuService.toggleSideMenu();
  }

  CloseSideMenu() {
    if (this.isMobileMenu == true) {
      this.mobileMenuService.toggleSideMenu();
    }
    
  }
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


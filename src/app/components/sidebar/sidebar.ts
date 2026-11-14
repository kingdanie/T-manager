import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MobileMenuService } from '../../services/mobile-menu-service';

interface NavBarItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
  imports: [RouterModule, CommonModule, MatIconModule],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private mobileMenuService = inject(MobileMenuService);

  // Directly expose the read-only signal from MobileMenuService
  isMobileMenu = this.mobileMenuService.isMobileMenuOpen;

  navbar_items: NavBarItem[] = [
    {
      label: 'Home',
      icon: '/icons/dashboard-icon.svg',
      link: '/dashboard',
    },
    {
      label: 'Tasks',
      icon: '/icons/calendar.svg',
      link: '/dashboard/tasks',
    },
    {
      label: 'Members',
      icon: '/icons/members.svg',
      link: '/dashboard/members',
    },
    {
      label: 'Settings',
      icon: '/icons/settings.svg',
      link: '/dashboard/settings',
    },
  ];

  toggleSideMenu(): void {
    this.mobileMenuService.toggleSideMenu();
  }

  closeSideMenu(): void {
    if (this.isMobileMenu()) {
      this.mobileMenuService.toggleSideMenu();
    }
  }
}
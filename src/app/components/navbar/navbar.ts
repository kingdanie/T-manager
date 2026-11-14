import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../services/modal-service';
import { AuthService } from '../../services/auth-service';
import { MobileMenuService } from '../../services/mobile-menu-service';

@Component({
  imports: [
    CommonModule, 
    RouterModule, 
    MatTooltipModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule
  ],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private _modalServer = inject(ModalService);
  private router = inject(Router);
  private auth = inject(AuthService);
  private mobileMenuService = inject(MobileMenuService);

  user: any = null;

  ngOnInit(): void {
    if (this.isBrowser) {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (error) {
        this.router.navigate(['/login']);
        console.error('Error parsing user data from local storage:', error);
      }
    }}
  }

  createTask(): void {
    this._modalServer.openCreateTaskModal();
  }

  logUserOut(): void {
    this.auth.logOut();
  }

  toggleMenu(): void {
    this.mobileMenuService.toggleSideMenu();
  }
}
import { Component, Inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MobilemenuService } from '../../mobilemenu.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, MatTooltipModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {
  faBell = faBell;
  faBars = faBars;
 
  user!: any 
  constructor(
    private _modalServer: ModalService, 
    private router: Router, 
    private auth: AuthService,
    private mobileMenuService: MobilemenuService) {}

  createTask () {
  this._modalServer.openCreateTaskModal();
  }

  logUserOut () {
    this.auth.logOut();
  }

  toggleMenu() {
    this.mobileMenuService.toggleSideMenu();
  }

  ngOnInit () {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      try {
        // Attempt to parse JSON data
        this.user = JSON.parse(userData);
        console.log(userData);
      } catch (error) {
        this.router.navigate(['/login']);
        console.error('Error parsing user data from local storage:', error);
        // Handle parsing error (e.g., clear local storage or display an error message)
      }
    } 
  }
}

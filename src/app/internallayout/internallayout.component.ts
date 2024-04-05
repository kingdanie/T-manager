import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-internallayout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './internallayout.component.html',
  styleUrl: './internallayout.component.css'
})
export class InternallayoutComponent {

}



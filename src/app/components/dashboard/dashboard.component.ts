import { Component } from '@angular/core';
import { NagivationComponent } from '../nagivation/nagivation.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NagivationComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  currentDate = new Date();


}

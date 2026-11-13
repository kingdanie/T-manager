import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../page-header/page-header';

@Component({
  imports: [PageHeader, ReactiveFormsModule],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  settingsForm!: FormGroup;

  ngOnInit(): void {
    const userData = localStorage.getItem('userInfo');
    let userName = '';
    let team = '';

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        userName = parsedData.name || '';
        team = parsedData.team || '';
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }

    // Initialize the form with prefilled data
    this.settingsForm = new FormGroup({
      name: new FormControl(userName, Validators.required),
      email: new FormControl(team, [Validators.required]),
      password: new FormControl('********', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      console.log(this.settingsForm.value);
    } else {
      this.settingsForm.markAllAsTouched();
    }
  }
}
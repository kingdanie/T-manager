import { Component } from '@angular/core';
import { PageHeaderComponent } from "../page-header/page-header.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
    imports: [PageHeaderComponent, ReactiveFormsModule]
})
export class SettingsComponent {
    settingsForm!: FormGroup;

    ngOnInit(): void {
      const userData = localStorage.getItem('userInfo');
      let userName = ""
      let team = "";
      if (userData) {
        try {
          // Attempt to parse JSON data
          userName = JSON.parse(userData).name;
          team = JSON.parse(userData).team;
          console.log( JSON.parse(userData).name);
        } catch (error) {
          console.error('Error parsing user data from local storage:', error);
          // Handle parsing error (e.g., clear local storage or display an error message)
        }
      } 
        // Initialize the form with prefilled data
        this.settingsForm = new FormGroup({
          name: new FormControl(userName, Validators.required),
          email: new FormControl(team, [Validators.required]),
          password: new FormControl('********', Validators.required) // Prefilled password
        });

   
          
     
      
        
      }
    
      // Method to submit the form
      onSubmit(): void {
        if (this.settingsForm.valid) {
          // Handle form submission here
          console.log(this.settingsForm.value);
        } else {
          // Mark all fields as touched to display validation messages
          this.settingsForm.markAllAsTouched();
        }
      }
}

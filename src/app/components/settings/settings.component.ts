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
        // Initialize the form with prefilled data
        this.settingsForm = new FormGroup({
          name: new FormControl('John Doe', Validators.required),
          email: new FormControl('john@example.com', [Validators.required, Validators.email]),
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usernames = ['olamide', 'IgKay', 'gwen', 'Hashbae']; // Array of usernames
  selectedUsername = 'IgKay'; // Default selected username


  username: string = 'IgKay';
  password: string = 'demo123';

  
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }


  onSubmit() {
    // Implement login logic (e.g., authenticate with a backend service)
    if (this.selectedUsername.length > 0 && this.password === 'demo123') {
      this.auth.getUserByUsername(this.selectedUsername).subscribe(response => {
        if (response && response.length === 1) { // Check for single user response
          const user = response[0]; // Get the first user object (assuming single user)
          localStorage.setItem('userInfo', JSON.stringify(user)); // Store user info in JSON format
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password (or unexpected response)');
        }
      });
    } else {
      // Handle invalid credentials
      alert('Invalid username or password');
    }
  }

}

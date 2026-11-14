import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private auth = inject(AuthService);

  usernames = ['olamide', 'IgKay', 'gwen', 'Hashbae']; // Array of usernames
  selectedUsername = 'IgKay'; // Default selected username

  username: string = 'IgKay';
  password: string = 'demo123';

  onSubmit(): void {
  if (!this.selectedUsername || this.password !== 'demo123') {
    alert('Invalid username or password');
    return;
  }

  this.auth.getUserByUsername(this.selectedUsername).subscribe({
    next: (response) => {
      if (response && response.username) {
        // Use AuthService to update authentication state
        this.auth.login(response);
      } else {
        alert('Invalid username or password');
      }
    },
    error: (error) => {
      console.error('Login error:', error);
      alert('Unable to login. Please try again.');
    }
  });
}
}
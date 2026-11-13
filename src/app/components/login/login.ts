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
    if (this.selectedUsername.length > 0 && this.password === 'demo123') {
      this.auth.getUserByUsername(this.selectedUsername).subscribe(response => {
        if (response && response.username) {
          const user = response;
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password (or unexpected response)');
        }
      });
    } else {
      alert('Invalid username or password');
    }
  }
}
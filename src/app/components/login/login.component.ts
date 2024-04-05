import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = 'demo';
  password: string = 'demo123';

  constructor(private router: Router) { }


  onSubmit() {
    // Implement login logic (e.g., authenticate with a backend service)
    if (this.username === 'demo' && this.password === 'demo123') {
      this.router.navigate(['/dashboard']);
    } else {
      // Handle invalid credentials
      alert('Invalid username or password');
    }
  }

}

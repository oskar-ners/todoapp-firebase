import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['../login-and-register.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService
        .register(this.username, this.email, this.password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/dashboard');
          },
          error: (err) => {
            this.errorMessage = err.message;
          },
        });
    }
  }
}

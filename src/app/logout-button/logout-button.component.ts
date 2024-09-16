import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: `
    <div (click)="logout()" class="logout">
      <i class="fa-solid fa-arrow-right-from-bracket icon-back"></i>
      <span>Logout</span>
    </div>
  `,
  styles: `
    .logout {
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
        }
        span {
            margin-left: 10px;
        }
    }
  `,
})
export class LogoutButtonComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: `
    <div (click)="logout()" class="logout">
      <i class="fa-solid fa-arrow-right-from-bracket icon-back"
        ><span>Logout</span></i
      >
    </div>
  `,
  styles: `
    .logout {
      cursor: pointer;
      display: inline-block;
      margin: 15px;
      padding: 10px;
      border: 2px solid white;
      & span {
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

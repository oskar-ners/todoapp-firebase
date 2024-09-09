import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UpdateProfileService } from '../services/update-profile.service';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  authService = inject(AuthService);
  router = inject(Router);
  firebaseAuth = inject(Auth);
  updateProfileService = inject(UpdateProfileService);

  newUsername: string = '';

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  onUpdateProfile(newUsername: string): void {
    if (newUsername.length > 1) {
      this.updateProfileService.updateUserProfile(newUsername);
      this.newUsername = '';
    }
  }
}

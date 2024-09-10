import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UpdateProfileService } from '../services/update-profile.service';
import { FormsModule, NgForm } from '@angular/forms';

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
  updateProfileService = inject(UpdateProfileService);

  newUsername: string | null = '';

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  onUpdateProfile(newUsername: string | null, form: NgForm): void {
    if (this.newUsername?.length === 0 || this.newUsername === null) return;
    else {
      this.updateProfileService.updateUserProfile(newUsername);
      form.resetForm();
    }
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UpdateProfileService } from '../services/update-profile.service';
import { FormsModule, NgForm } from '@angular/forms';
import { BackButtonComponent } from '../back-button/back-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    BackButtonComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  updateProfileService = inject(UpdateProfileService);

  newUsername: string | null = '';

  onUpdateProfile(newUsername: string | null, form: NgForm): void {
    if (this.newUsername?.length === 0 || this.newUsername === null) return;
    else {
      this.updateProfileService.updateUserProfile(newUsername);
      form.resetForm();
    }
  }
}

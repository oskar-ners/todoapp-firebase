import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { updateProfile } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  firebaseAuth = inject(Auth);

  //   Zaaktualizowanie profilu nowym username
  updateUserProfile(newUsername: string) {
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      updateProfile(currentUser, {
        displayName: newUsername,
      })
        .then(() => {
          console.log('Profile updated! Your new username --> ' + newUsername);
        })
        .catch((err) => {
          'Profile update failed ' + err.message;
        });
    }
  }
}

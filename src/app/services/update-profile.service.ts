import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc } from '@angular/fire/firestore';
import { updateProfile } from '@firebase/auth';
import { updateDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  //   Zaaktualizowanie profilu nowym username
  async updateUserProfile(newUsername: string | null) {
    const currentUser = this.firebaseAuth.currentUser;

    if (currentUser) {
      const userDocRef = doc(this.firestore, 'users', currentUser.uid);

      try {
        await updateProfile(currentUser, {
          displayName: newUsername,
        });

        await updateDoc(userDocRef, {
          username: newUsername,
        });

        console.log('Username updated successfully.');
      } catch (err) {
        console.error('Profile update failed: ' + err);
      }
    }
  }
}

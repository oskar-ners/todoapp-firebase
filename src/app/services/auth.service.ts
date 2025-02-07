import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  //   Rejestracja
  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(({ user }) => {
      updateProfile(user, { displayName: username });

      const uid = user.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);
      setDoc(userDocRef, { uid, username, email, password })
        .then(() => {
          console.log(`${username} registered!`);
        })
        .catch((error) => {
          console.log('Error ' + error.message);
        });
    });

    return from(promise);
  }

  //   Logowanie
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
      .then(() => {
        console.log(`${this.firebaseAuth.currentUser?.displayName} logged in!`);
      })
      .catch((error) => {
        console.log('Error ' + error.message);
        throw error;
      });
    return from(promise);
  }

  //   Wylogowanie
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth)
      .then(() => {
        console.log('Logged out!');
      })
      .catch((error) => {
        console.log('Error ' + error.message);
      });
    return from(promise);
  }
}

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-firebase-app-6faca',
        appId: '1:527017776703:web:a00340c39e35636863ca8a',
        storageBucket: 'angular-firebase-app-6faca.appspot.com',
        apiKey: 'AIzaSyANak5B4TVP0nLGWEqwh-LfWsgusiJRw8Y',
        authDomain: 'angular-firebase-app-6faca.firebaseapp.com',
        messagingSenderId: '527017776703',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};

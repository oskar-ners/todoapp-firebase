import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { BackButtonComponent } from '../back-button/back-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    BackButtonComponent,
    LogoutButtonComponent,
    TitleCasePipe,
    RouterLink,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  firebaseAuth = inject(Auth);
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((value: any) => {
        this.currentUrl = value.url;
      });
  }
}

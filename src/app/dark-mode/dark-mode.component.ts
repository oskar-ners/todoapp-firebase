import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="theme">
      <button
        [ngClass]="lightTheme() ? 'dark' : 'light'"
        (click)="switchTheme()"
      >
        {{ lightTheme() ? 'Light Theme' : 'Dark Theme' }}
      </button>
    </div>
  `,
  styles: `
  .theme {
    position: absolute;
    bottom: 3%;
    right: 3%;
    transition: transform 0.3 ease;
    & button {
    padding: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 8px;
    &:hover {
    transform: scale(1.2);
    }
    }
  }
  .light {
    background-color: black;
    color: white;
  }
  .dark {
    background-color: white;
    color: black;
  }
  .dark, .light {
    border: 2px solid purple;
  }
  `,
})
export class DarkModeComponent {
  lightTheme = signal<boolean>(false);

  switchTheme(): void {
    this.lightTheme.update((value) => !value);
    if (this.lightTheme()) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}

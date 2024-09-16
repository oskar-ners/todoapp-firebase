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
    z-index: 2;
    button {
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

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.lightTheme.set(savedTheme === 'light');
    this.updateBodyClass();
  }

  switchTheme(): void {
    this.lightTheme.update((value) => !value);
    const newTheme = this.lightTheme() ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    this.updateBodyClass();
  }

  updateBodyClass(): void {
    if (this.lightTheme()) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }
}

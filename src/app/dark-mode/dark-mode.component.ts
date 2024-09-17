import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="theme">
      <button
        [ngClass]="isDarkMode ? 'dark-mode-btn' : 'light-mode-btn'"
        (click)="toggleMode()"
      >
        {{ buttonLabel }}
      </button>
    </div>
  `,
  styles: `
    .theme {
      position: absolute;
      bottom: 3%;
      right: 3%;
      z-index: 2;
      transition: transform 0.3s ease;
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
    .dark-mode-btn {
      background-color: white !important;
      color: black !important;
    }
    .light-mode-btn {
      background-color: black !important;
      color: white !important;
    }
    .dark-mode-btn, .light-mode-btn {
      border: 2px solid purple;
    }
  `,
})
export class DarkModeComponent implements OnInit {
  isDarkMode: boolean = true;
  buttonLabel: string = 'Light Mode';

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') !== 'light';
    this.updateMode();
  }

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode ? 'dark' : 'light');
    this.updateMode();
  }

  updateMode(): void {
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
    this.buttonLabel = this.isDarkMode ? 'Light Mode' : 'Dark Mode';
  }
}

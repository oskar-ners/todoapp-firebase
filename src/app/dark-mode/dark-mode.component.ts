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
        {{ lightTheme() ? 'Dark Theme' : 'Light Theme' }}
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
    background-color: white;
    color: black;
  }
  .dark {
    background-color: black;
    color: white;
    border: 1px solid white;
  }
  `,
})
export class DarkModeComponent {
  lightTheme = signal<boolean>(false);

  switchTheme(): void {
    this.lightTheme.update((value) => !value);
    document.body.style.backgroundColor = this.lightTheme()
      ? 'black'
      : 'lightblue';
  }
}

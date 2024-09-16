import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="back" routerLink="/dashboard">
      <i class="fa-solid fa-arrow-rotate-left icon-back"></i>
      <span>Back</span>
    </div>
  `,
  styles: `
    .back {
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
        }
        span {
            margin-left: 10px;
        }
    }
  `,
})
export class BackButtonComponent {}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="back" routerLink="/dashboard">
      <i class="fa-solid fa-arrow-rotate-left icon-back"><span>Back</span></i>
    </div>
  `,
  styles: `
  .back {
    cursor: pointer;
    display: inline-block;
    margin: 15px;
    padding: 10px;
    border: 2px solid black;
    & span {
        margin-left: 10px;
    }
  }
  `,
})
export class BackButtonComponent {}

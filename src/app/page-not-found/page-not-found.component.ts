import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: `<div class="page-not-found">
    <img class="page-not-found-img" src="assets/images/page-not-found.jpg" />
  </div>`,
  styles: `
  .page-not-found img {
    @media (min-width: 1200px) {
        width: 100%;
    }
  }
  `,
})
export class PageNotFoundComponent {}

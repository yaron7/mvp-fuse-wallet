import { Component } from '@angular/core';

@Component({
  selector: 'mfw-root',
  template: `
   <main class="container">
     <router-outlet></router-outlet>
   </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'mvp-fuse-wallet';
}

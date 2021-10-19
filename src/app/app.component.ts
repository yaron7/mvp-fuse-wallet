import { Component } from '@angular/core';

@Component({
  selector: 'mfw-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'mvp-fuse-wallet';
}

import { Component } from '@angular/core';

@Component({
  selector: 'mfw-root',
  template: `
    <mfw-tokens-list></mfw-tokens-list>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'mvp-fuse-wallet';
}

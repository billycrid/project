import { Component } from '@angular/core';

@Component({
  selector: 'landing-page-component',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
    constructor() {
        console.log('this is the landing page');
    }
}

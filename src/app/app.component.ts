import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csci571-hw8';

  formSubmitted: boolean;

  submitTriggered(event) {
    this.formSubmitted = true;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'us-stat';
  items = [
      {'John', '1234%'},
      {'Mary', '4567*'},
      {'Adrian', '1977(*&^)'}
  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'us-stat';
  items = [
      {name: 'John', password: '1234%'},
      {name: 'Mary', password: '4567*'},
      {name: 'Adrian', password: '1977(*&^)'}
  ];
}

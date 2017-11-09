import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { DatasetService } from './dataset.service';
import { Dataset } from './dataset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'us-stat';

  /*users: User[] = [
      {name: 'John', password: '1234%'},
      {name: 'Mary', password: '4567*'},
      {name: 'Adrian', password: '1977(*&^)'}
  ];*/
  datasets: Dataset[];

  constructor(private datasetService: DatasetService) {
      this.datasetService = datasetService;
  }

  ngOnInit() {
        console.log('entered onInit ... ')
        this.datasetService.getAll().subscribe(ds => this.datasets = ds);
  }
}

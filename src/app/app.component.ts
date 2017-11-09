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

  datasets: Dataset[];
  activeComponent: number = 0;
  fullDataURL: string = '';
  variables: [];

  constructor(private datasetService: DatasetService) {
      this.datasetService = datasetService;
  }
  
  updateDetails(dataset: Dataset) {
      console.log(dataset);
  }

  ngOnInit() {
        console.log('entered onInit ... ')
        this.datasetService.getAll().subscribe(ds => this.datasets = ds);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { User } from './user';
import { DatasetService } from './dataset.service';
import { Dataset } from './dataset';
import { VariableService } from './variable.service';
import { Variable } from './variable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'us-stat';
  DS_LIST = 0;
  DS_VARS = 1;
  DS_DATA = 2;
  datasets: Dataset[];
  activeComponent: number = this.DS_LIST;
  variables: Variable[];

  constructor( private datasetService: DatasetService,
               private variableService: VariableService ) {
      this.datasetService = datasetService;
      this.variableService = variableService;
  }
  
  updateDetails(dataset: Dataset) {
      console.log(dataset);
      this.activeComponent = this.DS_VARS;
      this.variableService.getVariablesFor(dataset).subscribe(varb => this.variables = varb);
  }

  focusOnDatasets(event) {
      console.log('focus on dataset...');
      this.activeComponent = this.DS_LIST;
  }

  ngOnInit() {
        console.log('entered onInit ... ')
        this.datasetService.getAll().subscribe(ds => this.datasets = ds);
        console.log(this.activeComponent);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { User } from './user';
import { DatasetService } from './dataset.service';
import { Dataset } from './dataset';
import { VariableService } from './variable.service';
import { Variable } from './variable';
import { GeographyService } from './geography.service';
import { Geography } from './geography';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'us-stat';
  BASE_LINK = 'https://api.census.gov/data/';
  THE_KEY = 'b667e8eefd9f853b7357054725f24b2df9198397';
  DS_LIST = 0;
  DS_VARS = 1;
  DS_DATA = 2;
  datasets: Dataset[];
  selectedDataset: Dataset;
  activeComponent: number = this.DS_LIST;
  variables: Variable[];
  geographies: Geography[];
  data: any[];

  constructor( private datasetService: DatasetService,
               private variableService: VariableService,
               private geographyService: GeographyService,
               private dataService: DataService) {
      this.datasetService = datasetService;
      this.variableService = variableService;
      this.geographyService = geographyService;
      this.dataService = dataService;
  }

  updateDetails(dataset: Dataset) {
      console.log(dataset);
      this.selectedDataset = dataset;
      this.activeComponent = this.DS_VARS;
      this.variableService.getVariablesFor(dataset).subscribe(varb => this.variables = varb);
      this.geographyService.getGeographiesFor(dataset).subscribe(geog => this.geographies = geog);
  }

  getFullDataLink(dataset: Dataset) {
      const varArray: string[] = [];
      const filterArray: string[] = [];
      for (let i = 0; i < this.variables.length; i++) {
          const vv = this.variables[i];
          if ((vv.selected) && (vv.name !== 'in') && (vv.name !== 'for')) {
              varArray.push(vv.name);
          }
          if ((vv.name !== 'in') && (vv.name !== 'for')){
              if (vv.filter) {
                  filterArray.push('&' + vv.name + '=' + vv.filter);
              }
          } else {
              if (vv.filter) {
                  filterArray.push('&' + vv.name + '=' + vv.filter);
              }
          }
      }
      return this.BASE_LINK + dataset.year + '/' + dataset.codes +
          '?key=' + this.THE_KEY + '&get=' + varArray.join(',') +
          filterArray.join('');
  }

  bringData() {    this.dataService.getData(this.getFullDataLink(this.selectedDataset)).subscribe(theData => this.data = theData);
  }

  focusOnDatasets(event) {
      console.log('focus on dataset...');
      this.activeComponent = this.DS_LIST;
  }

  ngOnInit() {
        console.log('entered onInit ... ');
        this.datasetService.getAll().subscribe(ds => this.datasets = ds);
        console.log(this.activeComponent);
  }
}

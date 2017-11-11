import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DatasetService } from './dataset.service';
import { VariableService } from './variable.service';
import { GeographyService } from './geography.service';
import { DataService } from './data.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [DatasetService, VariableService, GeographyService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

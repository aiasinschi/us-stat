import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Dataset } from './dataset';

@Injectable()
export class DatasetService {
  private baseUrl: string = 'https://api.census.gov/data.json';
  private theKey: string = 'b667e8eefd9f853b7357054725f24b2df91983970';

  constructor(private http : Http){
  }

  getAll(): Observable<Dataset[]>{
    let datasets$ = this.http
      .get(`${this.baseUrl}`, { headers: this.getHeaders()})
      .map(mapDatasets)
      .catch(handleError);
      return datasets$;
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

function mapDatasets(response:Response): Dataset[]{
  //throw new Error('ups! Force choke!');
  // The response of the API has a results
  // property with the actual results
  return response.json().dataset.map(toDataset)
}

function toDataset(r:any): Dataset{
  let dataset = <Dataset>({
    year: r.c_vintage,
    codes: r.c_dataset.join('/'),
    geographyLink: r.c_geographyLink,
    variablesLink: r.c_variablesLink,
    tagsLink: r.c_tagsLink,
    examplesLink: r.c_examplesLink,
    groupsLink: r.c_groupsLink,
    validValuesLink: r.c_validValuesLink,
    documentationLink: r.c_documentationLink,
    isAggregate: r.c_isAggregate,
    isAvailable: r.c_isAvailable,
    type: r['@type'],
    title: r.title,
    accessLevel: r.accessLevel,
    bureauCodes: r.bureauCode,
    description: r.description,
    distribution: JSON.stringify(r.distribution),
    contactPoint: JSON.stringify(r.contactPoint),
    identifier: r.identifier,
    keywords: r.keyword,
    license: r.license,
    modified: r.modified,
    programCodes: r.programCode,
    references: r.references,
    spatial: r.spatial,
    temporal: r.temporal,
    publisher: JSON.stringify(r.publisher)
  });
  return dataset;
}

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}



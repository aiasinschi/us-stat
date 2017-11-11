import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Geography } from './geography';
import { Dataset } from './dataset';

@Injectable()
export class GeographyService {

  constructor(private http : Http){
  }

  getGeographiesFor(dataset: Dataset): Observable<Geography[]>{
    let geographies$ = this.http
      .get(`${dataset.geographyLink}`, { headers: this.getHeaders()})
      .map(mapGeographies)
      .catch(handleError);
      return geographies$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

function mapGeographies(response: Response): Geography[]{
  //throw new Error('ups! Force choke!');
  // The response of the API has a results
  // property with the actual results
  return response.json().fips.map(toGeography);
}

function toGeography(r:any): Geography {
  let geography = <Geography>({
    name: r.name,
    geoLevelId: r.geoLevelId,
    geoLevelDisplay: r.geoLevelDisplay,
    requires: r.requires,
    wildcard: r.wildcard,
    optionalWithWCFor: r.optionalWithWCFor
  });
  console.log(geography);
  return geography;
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



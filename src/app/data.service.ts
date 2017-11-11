import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Dataset } from './dataset';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getData(dataLink: string): Observable<any[]>{
    console.log(`getData from ${dataLink} ....`);
    let data$ = this.http
      .get(dataLink, { headers: this.getHeaders()})
      .map(mapData)
      .catch(handleError);
    console.log(data$)  ;
      return data$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}


function mapData(response: Response): any[]{
  //throw new Error('ups! Force choke!');
  // The response of the API has a results
  // property with the actual results
  return response.json()/*.map(toGeography)*/;
}

/*
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
*/

// this could also be a private method of the component class
function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}



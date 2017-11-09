import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Variable } from './variable';
import { Dataset } from './dataset';

@Injectable()
export class VariableService {
   private theKey: string = 'b667e8eefd9f853b7357054725f24b2df91983970';

  constructor(private http : Http){
  }

  getVariablesFor(dataset: Dataset): Observable<Variable[]>{
    let variables$ = this.http
      .get(`${dataset.variablesLink}`, { headers: this.getHeaders()})
      .map(mapDatasets)
      .catch(handleError);
      return variables$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

function mapDatasets(response: Response): Variable[]{
  //throw new Error('ups! Force choke!');
  // The response of the API has a results
  // property with the actual results
  console.log(response.json());
  let vars = response.json().variables;
  let newVars: any[] = [];
  for (var i = 0; i < Object.keys(vars).length; i++)     {
      let key = Object.keys(vars)[i];
      if ((key !== 'in') && (key !== 'for')) {
        let nv = vars[key];
        nv['name'] = key;
        newVars.push(nv)  ;
      }
  }
  return newVars.map(toVariable);
}

function toVariable(r:any): Variable {
  let variable = <Variable>({
    label: r.label,
    name: r.name,
    concept: r.concept,
    predicateType: r.predicateType,
    group: r.group,
    limit: r.limit,
    required: r.required,
    predicateOnly: r.predicateOnly,
    validValues: r.validValues,
    requiredClass: r.required ? 'requiredValue' : 'optionalValue'
  });
  console.log(variable);
  return variable;
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



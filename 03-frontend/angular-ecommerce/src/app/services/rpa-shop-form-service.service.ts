import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class RpaShopFormServiceService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';


  constructor(private httpClient: HttpClient) { }

  //map the json data from the spring data REST service to a country array
  //return an observable
  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries) //use map to map that data to our given data type
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {
    
    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];
  
    // build an array for "Month" dropdown list
    // start at current month and loop until

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    // "of" operator from rxjs, will wrap an object as an Observable
    // we're using Observables here because our angular component is going to subscribe to this method to receive the async data
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    // build an array for "Year" dropdown list
    // start at current year and loop for the next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    // "of" operator from rxjs, will wrap an object as an Observable
    // we're using Observables here because our angular component is going to subscribe to this method to receive the async data
    return of(data);
  }
}

//interface that helps me with this mapping
//unwrap the json from spring data rest _embedded entry
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}

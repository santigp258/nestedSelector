import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountrySmall } from '../interfaces/countries.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.eu/rest/v2';
  private _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountrySmall[]> {
    const url = `${this.baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<CountrySmall[]>(url);
  }

  constructor(private http: HttpClient) {}
}

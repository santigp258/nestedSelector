import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountrySmall, Country } from '../interfaces/countries.interface';
import { combineLatest, Observable, of } from 'rxjs';

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

  constructor(private http: HttpClient) {}
  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountrySmall[]> {
    const url = `${this.baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<CountrySmall[]>(url);
  }

  getCountryByAlphaCode(code: string): Observable<Country | null> {
    if (!code) {
      return of(null);
    }
    const url = `${this.baseUrl}/alpha/${code}`;
    return this.http.get<Country>(url);
  }

  getCountryBySmallCode(code: string): Observable<CountrySmall> {
    const url = `${this.baseUrl}/alpha/${code}?fields=alpha3Code;name`;
    return this.http.get<CountrySmall>(url);
  }

  getCountryByBorder(borders: string[]): Observable<CountrySmall[]> {
    if (!borders) {
      return of([]);
    }

    const petitions: Observable<CountrySmall>[] = [];

    borders.forEach((cod) => {
      const petition = this.getCountryBySmallCode(cod);
      petitions.push(petition);
    });

    return combineLatest(petitions);
  }
}

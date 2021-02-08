import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { CountriesService } from '../../services/countries.service';
import { CountrySmall, Country } from '../../interfaces/countries.interface';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borderCountry: ['', Validators.required],
  });

  //push selectores
  regions: string[] = [];
  countries: CountrySmall[] = [];
  country!: Country | null;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
    ///when change country
    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((region) => {
          this.myForm.get('country')?.reset(''); //clean myform.region
        }),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        //   console.log(countries);
        this.countries = countries;
      });

    //when change country
    this.myForm.get('country')?.valueChanges.subscribe((country) => {
      this.countriesService.getCountryByAlphaCode(country).subscribe(
        (country) => this.country = country
      )
    });
  }

  submit() {}
}

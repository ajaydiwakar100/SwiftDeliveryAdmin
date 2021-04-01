import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvailableCityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCountry() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'getCountry', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  getCity(countryID) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'getCity/' + countryID, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  saveLocation(locationData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'selectedCity', locationData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

}

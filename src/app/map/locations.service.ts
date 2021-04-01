import { Injectable } from '@angular/core';
 import {Http, Response} from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import { environment } from '../../environments/environment';
 import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw';

  @Injectable({
    providedIn: 'root'
  })

export class LocationsService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  getMarkers() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'listStaffDetails', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

}
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');

  constructor(
    private http: HttpClient
  ) { }

  getSetting() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.get(this.baseUrl + 'getSetting', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  saveSetting(settingData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.post(this.baseUrl + 'updateSettingValue', settingData, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

}

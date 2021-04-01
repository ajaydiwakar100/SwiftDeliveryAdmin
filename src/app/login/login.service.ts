import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  post(apiData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'loginAdmin', apiData, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  logout() {
    sessionStorage.clear();
  }

}

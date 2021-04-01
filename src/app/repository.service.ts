import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  post(apiData) {
  
    return this.http.post(this.baseUrl+apiData.route, apiData,
        {
        headers: apiData.header,
        observe: 'response'
        }  
    );   
  }

}

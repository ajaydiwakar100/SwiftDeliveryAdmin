import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.baseUrl;
  accessToken = sessionStorage.getItem('accessToken');

  constructor(private http: HttpClient) {
  }

  getWidgets() {
    return this.http.get(this.baseUrl + 'getWidgets', {
      observe: 'response'
    });
  }

  getOrderChart() {
    return this.http.get(this.baseUrl + 'getOrderChart', {
      observe: 'response'
    });
  } 

  getuserChart() {
    return this.http.get(this.baseUrl + 'getuserChart', {
      observe: 'response'
    });
  } 

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}

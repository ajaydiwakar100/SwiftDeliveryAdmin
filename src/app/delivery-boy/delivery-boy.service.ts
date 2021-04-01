import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { deliveryboyList } from './deliveryboy-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class deliveryBoyService {

  baseUrl = environment.baseUrl;
  accessToken = JSON.parse(sessionStorage.getItem('outletAccessToken'));

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.accessToken

  });

  httpHeadersImage = new HttpHeaders({
    'Content-Type': [],
    'Authorization': 'Bearer ' + this.accessToken

  });

  constructor(private http: HttpClient) {
  }

  getdeliveryBoyPage(page) {
    return this.http.get(this.baseUrl + 'listDeliveryStaff/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getDeliveryBoy(deliveryBoyId) {
    return this.http.get(this.baseUrl + 'getStaffDetail/' + deliveryBoyId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getDeliveryBoyList(page): Observable<deliveryboyList[]> {

    return this.http
      .get(this.baseUrl + 'listDeliveryStaff/' + page, { headers: this.httpHeaders })
      .map((response: Response) => {
        return <deliveryboyList[]>response['listStaff'];
      })
      .catch(this.handleError);
  }



  confirmDeliveryBoy(confirmData) {
    return this.http.post(this.baseUrl + 'staffApproval', confirmData, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  searchDeliveryBoy(deliveryBoyId) {
    return this.http.post(this.baseUrl + 'DeliveryBoySearch', deliveryBoyId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  updatestatus(data){
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'staffBlocked', data, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  deletestaff(id) {
    return this.http.get(this.baseUrl + 'deleteStaff/' + id).map((response: Response) => {
      return response;
    }).catch(this.handleError);
  }

  updateCashmodeStatus(data) {
    return this.http.post(this.baseUrl + 'cashmode', data, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
}

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { OrderList } from './order-list.model';
import { OrderPreviousList } from './order-previous-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  getOrderPage(page) {
    return this.http.get(this.baseUrl + 'listOutletOrders/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getPreviousOrderPage(page) {
    return this.http.get(this.baseUrl + 'listPreviousOrders/' + page, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getOrder(orderId) {
    return this.http.get(this.baseUrl + 'getOutletOrder/' + orderId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
 

  getOutletsOrderList(page): Observable<OrderList[]> {

    return this.http
      .get(this.baseUrl + 'listOutletOrders/' + page, { headers: this.httpHeaders })
      .map((response: Response) => {
        return <OrderList[]>response['listOrders'];
      })
      .catch(this.handleError);
  }

  getOutletsOrderPreviousList(page): Observable<OrderPreviousList[]> {

    return this.http
      .get(this.baseUrl + 'listPreviousOrders/' + page, { headers: this.httpHeaders })
      .map((response: Response) => {
        return <OrderPreviousList[]>response['listPreviousOrders'];
      })
      .catch(this.handleError);
  }

  confirmOrder(confirmData) {
    return this.http.post(this.baseUrl + 'updateOrderStatus', confirmData, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  getDeliveryBoysList(orderId) {
    return this.http.post(this.baseUrl + 'nearbyStaffList', orderId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  assigndeliveryBoy(data) {
    return this.http.post(this.baseUrl + 'manualAssignOrder', data, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  searchOrder(orderId) {
    return this.http.post(this.baseUrl + 'orderSearch', orderId, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

}

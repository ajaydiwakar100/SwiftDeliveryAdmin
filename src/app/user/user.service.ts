import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserOrder } from './user-view/user-order.model';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  accessToken = sessionStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  getUsers(page) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.get(this.baseUrl + 'getUsers/' + page, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  addUser(data) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'addUser', data, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  // deleteUser(id) {
  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(this.baseUrl + 'deleteUser', id, {

  //     headers: httpHeaders,
  //     observe: 'response'
  //   });
  // }

  deleteUser(id) {
    return this.http.get(this.baseUrl + 'deleteUser/' + id).map((response: Response) => {
      return response;
    }).catch(this.handleError);
  }

  getUser(id) {
    return this.http.get(this.baseUrl + 'getUser/' + id).map((response: Response) => {
      return response;
    }).catch(this.handleError);
  }

  getUserOrder(data): Observable<UserOrder[]> {
    return this.http.post(this.baseUrl + 'getUserOrder', data).map((response: Response) => {
      return <UserOrder[]>response['orders'];
    }).catch(this.handleError);
  }

  getUserOrderPageNumber(data) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl + 'getUserOrder', data, {
      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
  searchUsers(data) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.post(this.baseUrl + 'userSearch',data, {

      headers: httpHeaders,
      observe: 'response'
    });
  }
  updatestatus(data){	
    const httpHeaders = new HttpHeaders({	
      'Content-Type': 'application/json'	
    });	
    return this.http.post(this.baseUrl + 'userBlocked', data, {	
      headers: httpHeaders,	
      observe: 'response'	
    });	
  }  
}

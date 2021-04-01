import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { OutletList } from './outlet-list.model';
//  import { Outlet } from './outlet.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  baseUrl = environment.baseUrl;
  accessToken = sessionStorage.getItem('accessToken');

  constructor(private http: HttpClient) {
  }

  getOutletList(page): Observable<OutletList[]> {
    return this.http.get(this.baseUrl + 'listOutlet/' + page).map((response: Response) => {
      return <OutletList[]>response['outlets'];
    }).catch(this.handleError);
  }

  getOutlet(page) {
    return this.http.get(this.baseUrl + 'listOutlet/' + page, {
      observe: 'response'
    });
  }

  outletAdd(outletData) {

    const httpHeaders = new HttpHeaders({ 
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addOutlets', outletData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  outletEdit(outletData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateOutlet', outletData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  getOutletEdit(outletData): Observable<OutletList[]> {
    return this.http.get(this.baseUrl + 'getOutlet/' + outletData)
        .map((response: Response) => {
            return <OutletList[]>response['outlets'];
        })
        .catch(this.handleError);
  }

  getOutletDetail(id) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'getOutlet/' + id, {

      headers: httpHeaders,
      observe: 'response'
    });
  }


  getRestaurantList() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'listRestaurant', {

      headers: httpHeaders,
      observe: 'response'
    });
  }
  getTypeList() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'listType', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  restaurantAdminLogin(outletId) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'loginRestaurant', outletId, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  searchOutlets(page) {
    return this.http.post(this.baseUrl + 'outletSearch',page, {
      observe: 'response'
    });
  }

  getRestaurantListModal() {
    return this.http.get(this.baseUrl + 'getRestaurantlist', {
      observe: 'response'
    });
  }


  copyMenuItems(data) {
    return this.http.post(this.baseUrl + 'CopydishItems', data, {
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

    return this.http.post(this.baseUrl + 'restaurantBlocked', data, {

      headers: httpHeaders,
      observe: 'response'
    });
  } 
}

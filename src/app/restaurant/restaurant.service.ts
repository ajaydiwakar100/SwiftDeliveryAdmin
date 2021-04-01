import {Injectable} from '@angular/core';
 import {Http, Response} from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import { environment } from '../../environments/environment';
 import { RestaurantList } from './restaurant-list.model';
 import { Restaurant } from './restaurant.model';
 import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');
  restaurant: Restaurant;

  constructor(private http: HttpClient) {
  }

  getRestaurantList(page): Observable<RestaurantList[]> {
      return this.http
          .get(this.baseUrl + 'getRestaurantList/' + page)
          .map((response: Response) => {
              return <RestaurantList[]>response['restaurantList'];
          })
          .catch(this.handleError);
  }

  getRestaurant(page) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'getRestaurantList/' + page, {

      headers: httpHeaders,
      observe: 'response'
    });
  }
  restaurantEdit(typeData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateRestaurant', typeData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  restaurantlist(id) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'viewRestaurant', id, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  getRestaurantDetail(restaurantId) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'getRestaurant/' + restaurantId, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  addRestaurant(restaurantData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addRestaurant', restaurantData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  

  deleteRestaurant(id) {
    return this.http.get(this.baseUrl + 'deleteRestaurant/' + id).map((response: Response) => {
      return response;
    }).catch(this.handleError);
  }


  searchRestaurant(page) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl + 'restaurantsSearch', page, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}

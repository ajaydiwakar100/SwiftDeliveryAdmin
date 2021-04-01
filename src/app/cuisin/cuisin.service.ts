import {Injectable} from '@angular/core';
 import {Http, Response} from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import { environment } from '../../environments/environment';
 import { CuisinList } from './cuisin-list.model';
 import { Cuisin } from './cuisin.model';
 import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CuisinService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');
  cuisin: Cuisin;

  constructor(private http: HttpClient) {
  }

  getcuisinList(page): Observable<CuisinList[]> {
      return this.http
          .get(this.baseUrl + 'listCuisines/' + page)
          .map((response: Response) => {
              return <CuisinList[]>response['cusinies'];
          })
          .catch(this.handleError);
  }

  getcuisin(page) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'listCuisines/' + page, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  cuisinAdd(cuisinData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addCuisines', cuisinData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  cuisinEdit(cuisinData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateCuisines', cuisinData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  // getcuisinEdit(cuisinData) {

  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': [],
  //     'Accept': 'application/json'

  //   });

  //   return this.http.post(this.baseUrl + 'getCuisine', cuisinData, {

  //     headers: httpHeaders,
  //     observe: 'response'
  //   });

  // }

  getcuisinEdit(cuisinData): Observable<CuisinList[]> {
    return this.http
        .post(this.baseUrl + 'getCuisine', cuisinData)
        .map((response: Response) => {
            return <CuisinList[]>response['cuisines'];
        })
        .catch(this.handleError);
}

  deletecuisin(id) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'destroyCuisine', id, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}

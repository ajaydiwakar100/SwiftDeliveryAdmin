import {Injectable} from '@angular/core';
 import {Http, Response} from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import { environment } from '../../environments/environment';
//  import { CuisinList } from './cuisin-list.model';
//  import { Cuisin } from './cuisin.model';
 import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class CuisinService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');
  //cuisin: Cuisin;

  constructor(private http: HttpClient) {
  }

//   getcuisinList(page): Observable<CuisinList[]> {
//       return this.http
//           .get(this.baseUrl + 'listCuisines/' + page)
//           .map((response: Response) => {
//               return <CuisinList[]>response['cusinies'];
//           })
//           .catch(this.handleError);
//   }

  gettype() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'listAllType', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  typeAdd(typeData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addType', typeData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }
  typeEdit(typeData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateType', typeData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }
  getTypeId(id) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'viewType', id, {

      headers: httpHeaders,
      observe: 'response'
    });

  }
 


  deletetype(id) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'deleteType', id, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}

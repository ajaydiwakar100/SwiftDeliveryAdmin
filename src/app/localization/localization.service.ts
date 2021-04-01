import {Injectable} from '@angular/core';
 import {Http, Response} from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import { environment } from '../../environments/environment';
 import { Localization } from './localization.model';
 import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class localizationService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) {
  }

  // getlocalizationList(iso): Observable<Localization[]> {
  //     return this.http
  //         .get(this.baseUrl + 'getLanguageString/' + iso)
  //         .map((response: Response) => {
  //             return <Localization[]>response['cusinies'];
  //         })
  //         .catch(this.handleError);
  // }

  getlocalizationList(page) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'getLanguageString/' + page, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  updateLocalization(localizationData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateLanguageString', localizationData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  getEditlocalization(localizationData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updatelocalizationes', localizationData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  // getlocalizationEdit(localizationData) {

  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': [],
  //     'Accept': 'application/json'

  //   });

  //   return this.http.post(this.baseUrl + 'getlocalizatione', localizationData, {

  //     headers: httpHeaders,
  //     observe: 'response'
  //   });

  // }

  getlocalizationEdit(localizationData): Observable<Localization[]> {
    return this.http
        .post(this.baseUrl + 'getlocalizatione', localizationData)
        .map((response: Response) => {
            return <Localization[]>response['localizationes'];
        })
        .catch(this.handleError);
}

getCategoryList(id) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'destroylocalizatione', id, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}

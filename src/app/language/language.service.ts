import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { LanguageList } from './language-list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) {
  }

  getlanguageList(page): Observable<LanguageList[]> {
    return this.http
      .get(this.baseUrl + 'listLanguages')
      .map((response: Response) => {
        return <LanguageList[]>response['languages'];
      })
      .catch(this.handleError);
  }

  getlanguage(page) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.baseUrl + 'listLanguages', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  languageAdd(languageData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addLanguage', languageData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  languageEdit(languageData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updatelanguagees', languageData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  // getlanguageEdit(languageData) {

  //   const httpHeaders = new HttpHeaders({
  //     'Content-Type': [],
  //     'Accept': 'application/json'

  //   });

  //   return this.http.post(this.baseUrl + 'getlanguagee', languageData, {

  //     headers: httpHeaders,
  //     observe: 'response'
  //   });

  // }

  getlanguageEdit(languageData): Observable<LanguageList[]> {
    return this.http
      .post(this.baseUrl + 'getLanguages', languageData)
      .map((response: Response) => {
        return <LanguageList[]>response['language'];
      })
      .catch(this.handleError);
  }

  deletelanguage(id) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'destroylanguagee', id, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}

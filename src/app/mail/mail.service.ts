import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RegisterMail } from './register-mail/register-mail.model';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Response} from '@angular/http';



@Injectable({
  providedIn: 'root'
})
export class MailService {

  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');
  registerMail: RegisterMail;

  constructor(
    private http: HttpClient
  ) { }

  getRegisterMailList() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'listMailTemplate', {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  getEmailTemplate(id) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'getEmailTemplate/' + id, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  getMailTokenSignup() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'getMailTokens/signup', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  updateEmailTemplate(mailData) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateEmailTemplate', mailData, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  addEmailTemplate(mailData) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addEmailTemplate', mailData, {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  updateStatus(mailData) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateStatus', mailData, {

      headers: httpHeaders,
      observe: 'response'
    });
  }


}

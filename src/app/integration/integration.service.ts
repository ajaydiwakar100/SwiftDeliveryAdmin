import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  baseUrl = environment.baseUrl;
  accessToken = localStorage.getItem('accessToken');
  constructor(
    private http: HttpClient
  ) { }
  getIntegrationSettings() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(this.baseUrl + 'getIntegrationSetting', {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  updateTax(changeStatus) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.post(this.baseUrl + 'updateTax', changeStatus, {

      headers: httpHeaders,
      observe: 'response'
    });
  }
  getTax() {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    return this.http.get(this.baseUrl + 'getTax', {

      headers: httpHeaders,
      observe: 'response'
    });
  }
  makedefault(changeStatus) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateDefaultValue', changeStatus, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  changeStatus(changeStatus) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateOtpStatus', changeStatus, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  getMapKey() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(this.baseUrl + 'getMapKey', {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  getPushNotification() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(this.baseUrl + 'getPushNotification', {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  getStripeKey() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(this.baseUrl + 'getStripeKey', {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  getTwilioKey() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(this.baseUrl + 'getTwilioKey', {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  updateMapKey(mapKey) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateMapKey', mapKey, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  updatePushNotification(mapKey) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateFirebaseKey', mapKey, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  updateStripeKey(stripeData) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateStripeKey', stripeData, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  updateTwilioKey(twilioData) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateTwilioKey', twilioData, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  getChargesKey() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.get(this.baseUrl + 'getChargesKey', {
      headers: httpHeaders,
      observe: 'response'
    });
  }
  updateCharges(chargesKey) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });
    return this.http.post(this.baseUrl + 'updateChargesKey', chargesKey, {
      headers: httpHeaders,
      observe: 'response'
    });
  }
}
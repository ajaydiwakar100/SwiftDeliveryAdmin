import {Injectable} from '@angular/core';
 import {Http, Response} from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import { environment } from '../../environments/environment';
 import { BannerList } from './banner-list.model';
 import { Banner } from './banner.model';
 import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
 import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  baseUrl = environment.baseUrl;
  banner: Banner;

  accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

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

  getbannerList(page): Observable<BannerList[]> {
      return this.http
          .get(this.baseUrl + 'listBanners/' + page)
          .map((response: Response) => {
              return <BannerList[]>response['banners']['data'];
          })
          .catch(this.handleError);
  }

  getbanner(page) {
    return this.http.get(this.baseUrl + 'listBanners/' + page, {
      observe: 'response'
    });
  }

  bannerAdd(bannerData) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'addBanners', bannerData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  bannerEdit(bannerData) { console.log(bannerData);

    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.post(this.baseUrl + 'updateBanners', bannerData, {

      headers: httpHeaders,
      observe: 'response'
    });

  }

  getbannerEdit(bannerData): Observable<BannerList[]> {
    return this.http
        .get(this.baseUrl + 'getBanner/' + bannerData)
        .map((response: Response) => {
            return <BannerList[]>response['banners'];
        })
        .catch(this.handleError);
  }

  deleteBanner(id) {

    return this.http.get(this.baseUrl + 'deleteBanner/' + id, {

      headers: this.httpHeaders,
      observe: 'response'
    });
  }


  getOutlets() {
    const httpHeaders = new HttpHeaders({
      'Content-Type': [],
      'Accept': 'application/json'

    });

    return this.http.get(this.baseUrl + 'listOutlets', {

      headers: httpHeaders,
      observe: 'response'
    });
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
}

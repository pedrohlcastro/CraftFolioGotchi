import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class LayoutService {


  constructor(private http: Http, private authService: AuthService) {
   }

  updateLayout(userId, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`/api/layout/${userId}`, data, options)
      .map((res) => {
        return res.json();
      });
  }

  getLayout(userId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`/api/layout/${userId}`, options)
      .map((res) => {
        return res.json();
      });
  }


}

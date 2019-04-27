import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class TextService {

  constructor(private http: Http, private authService: AuthService) {
  }

  createText(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/text/`, data, options)
      .map((res) => {
        return res.json();
      });
  }

  getAllByUser(userId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`/api/text/${userId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  updateText(data, textId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`/api/text/${textId}`,data, options)
      .map((res) => {
        return res.json();
      });
  }

  deleteText(textId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`/api/text/${textId}`,options)
      .map(() => {
        return true;
      });
  }


}

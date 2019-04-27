import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';


@Injectable()
export class MediaService {

  constructor(private http: Http, private authService: AuthService) {
  }

  createMedia(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/media/`, data, options)
      .map((res) => {
        return res.json();
      });
  }

  getAllByUser(userId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`/api/media/${userId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  updateMedia(data, mediaId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`/api/media/${mediaId}`,data, options)
      .map((res) => {
        return res.json();
      });
  }

  deleteMedia(mediaId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`/api/media/${mediaId}`,options)
      .map(() => {
        return true;
      });
  }


}

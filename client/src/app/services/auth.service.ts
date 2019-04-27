import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private userToken;
  public loggedIn = new BehaviorSubject <boolean>(false);
  public userIdChange = new BehaviorSubject <string>("");

  constructor(private http: Http) { this.userToken = null; }

  // adds headers, if appendAuthorization true adds Authorization header
  addAuthHeader(appendAuthorization: boolean) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (appendAuthorization) {
      if (this.userToken) {
        headers.append('Authorization', this.userToken);
      } else {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
          headers.append('Authorization', userToken.token);
        }
      }
    }
    return new RequestOptions({ headers: headers });
  }

  createUser(userData){
    return this.http.post(`/api/auth/signup`, userData)
      .map((res)=> {
        return res.json();
      });
  }

  loginUser(userData){
    return this.http.post(`/api/auth/signin`, userData)
      .map((res)=> {
        const resJSON = res.json();
        this.userToken = resJSON.token || null;
        if (this.userToken) {
          localStorage.setItem('userToken', JSON.stringify({ token: this.userToken }));
          this.loggedIn.next(true);
          this.userIdChange.next(resJSON.userId)
          return resJSON;
        }
        return resJSON;
      });
  }

  checkToken(){
    const options = this.addAuthHeader(true);
    return this.http.get(`/api/auth/checktoken`, options)
      .map((res) => {
        const resJSON = res.json();
        if (resJSON.result === 'Success') {
          this.loggedIn.next(true);
          this.userIdChange.next(resJSON.userId)
        }
        return resJSON;
      });
  }

  getToken() {
    if (this.userToken) {
      return this.userToken;
    } else {
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      if (userToken) {
        return userToken.token;
      } else {
        return null;
      }
    }
  }

  getName(userId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`/api/auth/name/${userId}`, options)
      .map((res) => {
        return res.json();
      });
  }
  
  // logout method
  logout(): void {
    // clear token remove user from local storage to log user out
    this.loggedIn.next(false);
    this.userIdChange.next("")
    this.userToken = null;
    localStorage.removeItem('userToken');
  }
}
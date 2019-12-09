import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private baseOptions:RequestOptions) { }

  getToken() {
    var token = localStorage.getItem('token');

    if (!token) {
      // pobieramy go z apierwszym razem gdy logowaliśmy się do api spotify
      var match = window.location.hash.match(/#access_token=(.*?)&/);
      token = match && match[1];
      // i zapisujemy go do localStorage
      localStorage.setItem('token', token);
    }

    // Jeśli ani nie mamy tokena w pamięci ani w pasku adresu to znaczy że nie byliśmy jeszcze na stronie spotify, więc przekierowywujemy
    if (!token) {
      this.authorize();
    }

    this.baseOptions.headers.set('Authorization', 'Bearer ' + token);

    return token;
  }

  authorize() {
    localStorage.removeItem('token');
    let client_id = 'f9e4821d19d3464e8e8353b6d3a7fe36';
    let redirect_uri = 'http://localhost:4200/';

    window.location.replace(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`)
  }

}

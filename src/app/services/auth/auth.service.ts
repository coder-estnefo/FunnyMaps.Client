import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface OkResponse {
  message: string;
}

interface Token {
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7081/api/Auth/';

  http = inject(HttpClient);

  constructor() {
    var x = this.getToken();
    if (x) {
      this.isLoggedIn = true;
    }
  }

  isLoggedIn: boolean = false;

  register(email: string, password: string): Observable<OkResponse> {
    var url = new URL('register', this.baseUrl).href;
    return this.http.post<OkResponse>(url, { email, password });
  }

  login(email: string, password: string) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    var url = new URL('login', this.baseUrl);
    url.searchParams.append('username', email);
    url.searchParams.append('password', password);
    return this.http
      .post(url.href, { email, password }, { headers, responseType: 'text' })
      .pipe(map((token) => this.storeToken(token)));
  }

  private storeToken(token: string) {
    this.isLoggedIn = true;
    localStorage.setItem('token', token);
  }

  getToken(): string | null | undefined {
    var token = localStorage.getItem('token');

    if (token != null) {
      return token;
    }

    return;
  }
}

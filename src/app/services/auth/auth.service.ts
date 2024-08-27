import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ErrorModel } from 'src/app/interfaces/error-model';
import { environment } from 'src/environments/environment.development';

export interface Token {
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.authBaseUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  http = inject(HttpClient);

  constructor() {
    var token = this.getToken();
    if (token) {
      this.isLoggedIn = true;
    }
  }

  isLoggedIn: boolean = false;

  register(email: string, password: string): Observable<HttpStatusCode> {
    var url = new URL('register', this.baseUrl).href;
    return this.http
      .post<HttpStatusCode>(url, { email, password }, { headers: this.headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this._handleError(error);
        })
      );
  }

  login(email: string, password: string): Observable<string> {
    var url = new URL('login', this.baseUrl);
    return this.http
      .post<Token>(url.href, { email, password }, { headers: this.headers })
      .pipe(
        map((token: Token) => token.value),
        catchError((error: HttpErrorResponse) => {
          return this._handleError(error);
        })
      );
  }

  private _handleError(error: HttpErrorResponse) {
    var _error: ErrorModel;

    if (error.status >= 400) {
      if (error.error) {
        _error = {
          status: error.error['status'],
          title: error.error['title'],
          detail: error.error['detail'],
        };
      }

      if (error.error.errors) {
        var emailErrors = error.error['errors']['Email'];
        var passwordErrors = error.error['errors']['Password'];

        const errors = [];

        if (emailErrors) {
          errors.push(...emailErrors);
        }

        if (passwordErrors) {
          errors.push(...passwordErrors);
        }

        _error = {
          status: error.error['status'],
          title: error.error['title'],
          detail: error.error['title'],
          errors: errors,
        };
      }
    } else {
      _error = {
        detail: error.statusText,
        status: error.status,
        title: error.name,
      };
    }

    return throwError(() => _error);
  }

  storeToken(token: string) {
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

  logout() {
    localStorage.removeItem('token');
  }
}

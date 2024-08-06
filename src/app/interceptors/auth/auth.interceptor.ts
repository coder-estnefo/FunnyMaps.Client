import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  auth = inject(AuthService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/Jokes')) {
      var token = this.auth.getToken();
      var httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('Content-Type', 'application/json');
      httpHeaders = httpHeaders.set('Authorization', `bearer ${token}`);
      var newRequest = request.clone({
        headers: httpHeaders,
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}

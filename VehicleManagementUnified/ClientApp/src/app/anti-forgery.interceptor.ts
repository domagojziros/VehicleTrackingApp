/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';

@Injectable()
export class AntiForgeryInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if(!token) {
      return next.handle(
        req.clone({
          withCredentials: true
        })
      );
    }

    return next.handle(
      req.clone({
        withCredentials: true,
        headers: req.headers.set('X-XSRF-TOKEN', <string>token)
      })
    );
  }
}

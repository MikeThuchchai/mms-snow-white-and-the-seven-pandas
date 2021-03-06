import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export const API_URL_PREFIX = new InjectionToken<string>('API URL Prefix');

@Injectable()
export class UrlPrefixInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_URL_PREFIX) private apiUrlPrefix: string
  ) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const prefixedReq = req.clone({ url: this.apiUrlPrefix + req.url });
    return next.handle(prefixedReq);
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpOptionsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // TODO: move to cfg
        const baseUri = 'http://localhost:5000/api/';

        const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        req = req.clone({
            url: baseUri + req.url,
            headers: headers
        });

        return next.handle(req);
    }
}
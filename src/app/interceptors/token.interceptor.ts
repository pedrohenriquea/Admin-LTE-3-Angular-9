import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.api_url.split('/');
    const token = localStorage.getItem('token');

    if(token && (requestUrl[2] === apiUrl[2])){
       const newRequest =  request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
       return next.handle(newRequest).pipe(catchError(this.errorHandler));
    }else{
        return next.handle(request);
    }
  }

  errorHandler(errorResponse: HttpErrorResponse) {
    localStorage.clear();
    return throwError(errorResponse.message || "server error.");
}
}
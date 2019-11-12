import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }

  get<T>(url): Observable<T> {
    console.log('get:', url);
    return this.http.get<T>(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  post<T>(url, data: T): Observable<T> {
    console.log('post:', url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  put<T>(url, data: T): Observable<T> {
    console.log('put:', url);
    return this.http.put<T>(url, data).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  delete<T>(url, data: T): Observable<T> {
    console.log('delete:', url);
    return this.http.delete<T>(url, data).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
}

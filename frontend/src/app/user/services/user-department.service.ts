import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDepartmentService {

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  getUserDepts (data): Observable<any> {
    const query_params = new HttpParams({fromObject: data});
    console.log('query_params',query_params);
    return this.http.get(environment.apiUrl + '/user-departments', { params : query_params })
  }

  getMyDepts (data): Observable<any> {
    const query_params = new HttpParams({fromObject: data});
    console.log('query_params',query_params);
    return this.http.get(environment.apiUrl + '/user-departments/me', { params : query_params })
  }


  createUserDept (data): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/user-departments/create', JSON.stringify(data), this.httpOptions).pipe(
      tap((data)),
      catchError(this.handleError)
    );
  }

  updateUserDept (data): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/user-departments/update/'+ data.id, JSON.stringify(data), this.httpOptions).pipe(
      tap((data)),
      catchError(this.handleError)
    );
  }

  deleteUserDept (data): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/user-departments/delete/'+ data.id, JSON.stringify(data), this.httpOptions).pipe(
      tap((data)),
      catchError(this.handleError)
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, interval  } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public dataResults;
  // pollingData: any;      

  constructor(public toastr: ToastrManager, private http: HttpClient) {
    // this.pollingData = interval(5000).switchMap(() => http.get(environment.apiUrl + '/expenses/status')).subscribe((result: any[]) => {
    //   console.log('result',result);
    //   if (result.length > 0) {
    //     this.toastr.successToastr(result[0].pushMsg + '  !', 'Success');
    //   }
    // });
   }
  //  ngOnDestroy() {
  //   this.pollingData.unsubscribe();
  //  }

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

  getUsers (data): Observable<any> {
    const query_params = new HttpParams({fromObject: data});
    return this.http.get(environment.apiUrl + '/users', { params : query_params })
  }
  
  getUser (data): Observable<any> {
    const options = { params: new HttpParams(data) };
    return this.http.get(environment.apiUrl + '/users/me', options)
  }


  createUser (data): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/users/create', JSON.stringify(data), this.httpOptions).pipe(
      tap((data)),
      catchError(this.handleError)
    );
  }

  updateUser (data): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/users/update/'+ data.id, JSON.stringify(data), this.httpOptions).pipe(
      tap((data)),
      catchError(this.handleError)
    );
  }

  deleteUser (data): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/users/delete/'+ data.id, JSON.stringify(data), this.httpOptions).pipe(
      tap((data)),
      catchError(this.handleError)
    );
  }

}

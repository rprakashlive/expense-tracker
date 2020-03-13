import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public dataResults;
  authToken: any;
  user: any;
  constructor(private http: HttpClient, private router: Router) { }

  private userLoggedIn = new BehaviorSubject(false);

  private currentUserObj = new BehaviorSubject({});

  getCurrentUserObj(): Observable<any> {
    return this.currentUserObj.asObservable();
  }

  getCurrentUserValue(): any {
    return this.currentUserObj.getValue();
  }
  
  setCurrentUserObj(val) {
    this.currentUserObj.next(val);
  }

  getLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
  getLoggedInValue(): boolean {
    return this.userLoggedIn.getValue();
  }

  setLoggedIn(val: boolean) {
    this.userLoggedIn.next(val);
  }

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

  
  registerUser = (user) => {
    return this.http.post<any>(environment.apiUrl + '/auth/register', JSON.stringify(user), this.httpOptions).pipe(
      tap((user)),
      catchError(this.handleError)
    );
  }

  loggedIn = () => {
    return tokenNotExpired('id_token');
  }
  
  // loginUser (user): Observable<any> {
  //   return this.http.post<any>(environment.apiUrl + '/auth/login', JSON.stringify(user)).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  loginUser (user){
    console.log('environment.apiUrl',environment.apiUrl);
    return this.http.post<any>(environment.apiUrl + '/auth/login', JSON.parse(JSON.stringify(user)));
  }


  
  getUserProfile = () => {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + this.authToken);
    
    return this.http.post<any>(environment.apiUrl + '/users/profile', {headers : headers}).pipe(
      tap((user => {})),
      catchError(this.handleError)
    );
  }

  storeUserData = (token, user) => {
    //angular jwt to validate the token by default looks id_token from local storage, it can be configurgurable
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken = () => {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadRoles = () => {
    return JSON.parse(localStorage.getItem('roles'));
  }

  logout = () => {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.setLoggedIn(false);
    this.router.navigate(['/user/login']);
  }













}


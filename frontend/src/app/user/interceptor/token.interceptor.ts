import {Injectable} from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import {Observable, of, throwError, from} from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators";
import { SpinnerService } from "../../spinner/spinner.service"
import { finalize } from "rxjs/operators";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public toastr: ToastrManager, private router: Router, private spinnerService: SpinnerService) {
  }


  /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("init")
    this.spinnerService.showLoader();
    if (localStorage.getItem('id_token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        }
      });
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }), finalize(() => this.spinnerService.hideLoader()) as any);
  }

  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    
    if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
        this.toastr.errorToastr(err.error.message, 'An error occurred');
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log('err',err.error)
        console.error(
          `Backend returned code ${err.status}, ` +
          `body was: ${err.error.message}`);
          this.toastr.errorToastr(err.error.message, 'An error occurred');
      }
      // return an observable with a user-facing error message
      return of('Something bad happened; please try again later.');
  }
}
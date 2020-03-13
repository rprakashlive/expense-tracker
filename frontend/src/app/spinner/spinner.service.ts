import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = new Subject<boolean>();

  constructor() { }

  showLoader() {
    this.isLoading.next(true);
  }

  hideLoader():void {
    this.isLoading.next(false);
  }

}

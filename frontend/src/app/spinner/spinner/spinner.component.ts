import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../spinner.service"
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  
  
  isLoading: Subject<boolean> = this.spinner.isLoading;
  ngOnInit() {
  }
  constructor(private spinner: SpinnerService, private ngxspinner: NgxSpinnerService) { }
  
  activateSpinner(val){
    if(val) {
      this.ngxspinner.show()
    }else {
      this.ngxspinner.hide()
    }
  }
  
}

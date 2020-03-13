import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
  }
}

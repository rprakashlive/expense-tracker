import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { AuthService } from '../user/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  roles:any = [];
  userLoggedIn:any = false;
  getCurrentUserObj:any; 
  private subscription: Subscription  
  
  constructor(public sidebarservice: SidebarService, private authService: AuthService) {
    this.menus = sidebarservice.getMenuList();
   }

  ngOnInit() {
    this.subscription = this.authService.getLoggedIn().subscribe(value => {
      this.userLoggedIn = value;
  });

  this.subscription = this.authService.getCurrentUserObj().subscribe(value => {
    this.getCurrentUserObj = value;
    this.roles = this.getCurrentUserObj.roles;
});

    if (this.authService.loggedIn()) {
      this.roles = this.authService.loadRoles();
      this.getCurrentUserObj = {
        user : this.authService.loadUser()
      } 
      this.userLoggedIn = true
    } else {
      this.userLoggedIn = false    
    }
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  logout() {
    this.authService.logout();
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/dashboard',
      type: 'simple'
    },
    {
      title: 'Expenses',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/manage-expenses',
      type: 'simple'
    },
    {
      title: 'Roles',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/manage-roles',
      type: 'simple',
      is_access : 'ADMIN'
    },
    {
      title: 'Departments',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/manage-departments',
      type: 'simple',
      is_access : 'ADMIN'
    },
    {
      title: 'Categories',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/manage-categories',
      type: 'simple',
      is_access : 'ADMIN'
    },
    {
      title: 'Users',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/manage-users',
      type: 'simple',
      is_access : 'ADMIN'
    },
    {
      title: 'Map Roles',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/map-roles',
      type: 'simple',
      is_access : 'ADMIN'
    },{
      title: 'Map Departments',
      icon: 'fa fa-folder',
      active: false,
      path: 'user/map-departments',
      type: 'simple',
      is_access : 'ADMIN'
    }
    
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}

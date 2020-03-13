import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserRoleService } from '../services/user-role.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  user:any = '';
  constructor(public toastr: ToastrManager, private roleService: RoleService, private userService : UserService,
     private confirmationDialogService: ConfirmationDialogService,
     private userRoleService: UserRoleService) { }
  roleList: Array<any> = [];
  userRoleList:Array<any> = [];
  userList:Array<any> = [];
  ngOnInit() {
    this.getRoles();
    this.getUsers();
    this.getUserRoles();
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }


  getUserRoles() {
    this.userRoleService.getUserRoles({"is_active":1}).subscribe(data => {
      if (data) {
        this.userRoleList = data;
      } else {
        this.userRoleList = [];
      }
    });  
  }

    getRoles() {
      this.roleService.getRoles({"is_active":1}).subscribe(data => {
        if (data) {
          this.roleList = data;
          console.log('this.roleList',this.roleList);
        } else {
          this.roleList = [];
        }
      });  
    }

    getUsers() {
      this.userService.getUsers({"is_active":1}).subscribe(data => {
        if (data) {
          this.userList = data;
          console.log('this.userList',this.userList);
        } else {
          this.userList = [];
        }
      });  
    }


    saveUserRole(newUserRole, i) {
      const userRoleObj = {
        role_id : newUserRole.role_id,
        user_id : newUserRole.user_id,
        created_by : this.user.id,
        created_at : moment().format('YYYY-MM-DD HH:MM:00'),
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
      }
      console.log(userRoleObj);
      this.userRoleService.createUserRole(userRoleObj).subscribe(data => {
        if (data) {
          this.toastr.successToastr(data.affectedRows + ' User Role Created Successfully !', 'Success');
          this.getUserRoles();
        } else {
          this.getUserRoles();
        }
      });  
    }
  
    updateUserRole(i, userRole) {
      const updateObj = {
        id : userRole.id,
        role_id : userRole.role_id,
        user_id : userRole.user_id,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
      }
      this.userRoleService.updateUserRole(updateObj).subscribe(data => {
        if (data) {
          this.userRoleList[i] = userRole;
          this.toastr.successToastr(data.affectedRows + ' User Role Updated Successfully !', 'Success');
        } else {
          
        }
      })
    }
  
    public openConfirmationDialog(i, userRole) {
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete?')
      .then((confirmed) => 
        this.removeUserRole(i, userRole)  
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    } 
  
  
    removeUserRole(i, userRole) {
      const updateObj = {
        id : userRole.id,
        is_active : 0
      }
      this.userRoleService.deleteUserRole(updateObj).subscribe(data => {
        if (data) {
          this.userRoleList.splice(i,1);
          this.toastr.successToastr(data.affectedRows + ' User Role Deleted Successfully !', 'Success');
        } else {
          
        }
      })
    }

  add() {
    this.userRoleList.push({role_id:'', user_id:'', created_at:moment().format('YYYY-MM-DD'), first_name:this.user.first_name, is_create: true});
  }


  }

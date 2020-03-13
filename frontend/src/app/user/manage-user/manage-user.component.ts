import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  user:any = '';
  constructor(public toastr: ToastrManager, private roleService: RoleService, private userService : UserService, private confirmationDialogService: ConfirmationDialogService) { }
  userList: Array<any> = [];
  ngOnInit() {
    this.getUsers()
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  getUsers() {
    this.userService.getUsers({"is_active":1}).subscribe(data => {
      if (data) {
        this.userList = data;
      } else {
        this.userList = [];
      }
    });  
  }

  saveUser(newUser, i) {
    const userObj = {
      first_name : newUser.first_name,
      email : newUser.email,
      password_hash : newUser.password,
      created_by : this.user.id,
      created_at : moment().format('YYYY-MM-DD HH:MM:00'),
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    console.log(newUser);
    this.userService.createUser(userObj).subscribe(data => {
      if (data) {
        this.toastr.successToastr(data.affectedRows + ' User Created Successfully !', 'Success');
        this.getUsers();
      } else {
        this.getUsers();
      }
    });  
  }

  updateUser(i, user) {
    const updateObj = {
      id : user.id,
      first_name : user.first_name,
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    if (user.password && user.password.length > 0) {
      console.log('user.password.length',user.password.length);
      return
    }
    this.userService.updateUser(updateObj).subscribe(data => {
      if (data) {
        this.userList[i] = user;
        this.toastr.successToastr(data.affectedRows + ' User Updated Successfully !', 'Success');
      } else {
        
      }
    })
  }

  public openConfirmationDialog(i, user) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ?')
    .then((confirmed) => 
      this.removeUser(i, user)  
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  removeUser(i, user) {
    const updateObj = {
      id : user.id
    }
    this.userService.deleteUser(updateObj).subscribe(data => {
      if (data) {
        this.userList.splice(i,1);
        this.toastr.successToastr(data.affectedRows + ' User Deleted Successfully !', 'Success');
      } else {
        
      }
    })
  }

  add() {
    this.userList.push({first_name:'', email:'', password:'',  is_create: true});
  }

}

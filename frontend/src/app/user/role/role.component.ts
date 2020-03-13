import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  user:any = '';
  constructor(public toastr: ToastrManager, private roleService: RoleService, private userService : UserService, private confirmationDialogService: ConfirmationDialogService) { }
  roleList: Array<any> = [];
  ngOnInit() {
    this.getRoles()
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  getRoles() {
    this.roleService.getRoles({"is_active":1}).subscribe(data => {
      if (data) {
        this.roleList = data;
      } else {
        this.roleList = [];
      }
    });  
  }

  saveRole(newRole, i) {
    const roleObj = {
      name : newRole.name,
      created_by : this.user.id,
      created_at : moment().format('YYYY-MM-DD HH:MM:00'),
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    console.log(roleObj);
    this.roleService.createRole(roleObj).subscribe(data => {
      if (data) {
        this.toastr.successToastr(data.affectedRows + ' Role Created Successfully !', 'Success');
        this.getRoles();
      } else {
        this.getRoles();
      }
    });  
  }

  updateRole(i, role) {
    const updateObj = {
      id : role.id,
      name : role.name,
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    this.roleService.updateRole(updateObj).subscribe(data => {
      if (data) {
        this.roleList[i] = role;
        this.toastr.successToastr(data.affectedRows + ' Role Updated Successfully !', 'Success');
      } else {
        
      }
    })
  }

  public openConfirmationDialog(i, role) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ?')
    .then((confirmed) => 
      this.removeRole(i, role)  
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  } 


  removeRole(i, role) {
    const updateObj = {
      id : role.id,
      is_active : 0
    }
    this.roleService.deleteRole(updateObj).subscribe(data => {
      if (data) {
        this.roleList.splice(i,1);
        this.toastr.successToastr(data.affectedRows + ' Role Deleted Successfully !', 'Success');
      } else {
        
      }
    })
  }

  add() {
    this.roleList.push({name:'', created_at:moment().format('YYYY-MM-DD'), first_name:this.user.first_name, is_create: true});
  }
    
  }




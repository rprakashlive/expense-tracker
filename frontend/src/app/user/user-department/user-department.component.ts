import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserDepartmentService } from '../services/user-department.service';

@Component({
  selector: 'app-user-department',
  templateUrl: './user-department.component.html',
  styleUrls: ['./user-department.component.css']
})
export class UserDepartmentComponent implements OnInit {

  user:any = '';
  constructor(public toastr: ToastrManager, private departmentService: DepartmentService, private userService : UserService,
     private confirmationDialogService: ConfirmationDialogService,
     private userDeptService: UserDepartmentService) { }
  deptList: Array<any> = [];
  userDeptList:Array<any> = [];
  userList:Array<any> = [];
  ngOnInit() {
    this.getDepts();
    this.getUsers();
    this.getUserDepts();
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }


  getUserDepts() {
    this.userDeptService.getUserDepts({"is_active":1}).subscribe(data => {
      if (data) {
        this.userDeptList = data;
      } else {
        this.userDeptList = [];
      }
    });  
  }

  getDepts() {
      this.departmentService.getDept({"is_active":1}).subscribe(data => {
        if (data) {
          this.deptList = data;
          console.log('this.deptList',this.deptList);
        } else {
          this.deptList = [];
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


    saveUserDept(newUserDept, i) {
      const userDeptObj = {
        dept_id : newUserDept.dept_id,
        user_id : newUserDept.user_id,
        created_by : this.user.id,
        created_at : moment().format('YYYY-MM-DD HH:MM:00'),
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
      }
      console.log(userDeptObj);
      this.userDeptService.createUserDept(userDeptObj).subscribe(data => {
        if (data) {
          this.toastr.successToastr(data.affectedRows + ' User Department Created Successfully !', 'Success');
          this.getUserDepts();
        } else {
          this.getUserDepts();
        }
      });  
    }
  
    updateUserDept (i, userDept) {
      const updateObj = {
        id : userDept.id,
        dept_id : userDept.dept_id,
        user_id : userDept.user_id,
        updated_at : moment().format('YYYY-MM-DD HH:MM:00')
      }
      this.userDeptService.updateUserDept(updateObj).subscribe(data => {
        if (data) {
          this.userDeptList[i] = userDept;
          this.toastr.successToastr(data.affectedRows + ' User Department Updated Successfully !', 'Success');
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
      this.userDeptService.deleteUserDept(updateObj).subscribe(data => {
        if (data) {
          this.userDeptList.splice(i,1);
          this.toastr.successToastr(data.affectedRows + ' User Department Deleted Successfully !', 'Success');
        } else {
          
        }
      })
    }

  add() {
    this.userDeptList.push({dept_id:'', user_id:'', created_at:moment().format('YYYY-MM-DD'), first_name:this.user.first_name, is_create: true});
  }

}

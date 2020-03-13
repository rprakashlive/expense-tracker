import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  user:any = '';
  departmentList: Array<any> = [];
  constructor(public toastr: ToastrManager, private departmentService: DepartmentService, private userService : UserService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getDept()
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  getDept() {
    this.departmentService.getDept({"is_active":1}).subscribe(data => {
      if (data) {
        this.departmentList = data;
      } else {
        this.departmentList = [];
      }
    });  
  }

  saveDept(newDept, i) {
    const deptObj = {
      name : newDept.name,
      created_by : this.user.id,
      created_at : moment().format('YYYY-MM-DD HH:MM:00'),
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    console.log(deptObj);
    this.departmentService.createDept(deptObj).subscribe(data => {
      if (data) {
        this.toastr.successToastr(data.affectedRows + ' Department Created Successfully !', 'Success');
        this.getDept();
      } else {
        this.getDept();
      }
    });  
  }

  updateDept(i, department) {
    const updateObj = {
      id : department.id,
      name : department.name,
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    this.departmentService.updateDept(updateObj).subscribe(data => {
      if (data) {
        this.departmentList[i] = department;
        this.toastr.successToastr(data.affectedRows + ' Department Updated Successfully !', 'Success');
      } else {
        
      }
    })
  }

  public openConfirmationDialog(i, department) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ?')
    .then((confirmed) => 
      this.removeDept(i, department)  
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  } 


  removeDept(i, department) {
    const updateObj = {
      id : department.id,
      is_active : 0
    }
    this.departmentService.deleteDept(updateObj).subscribe(data => {
      if (data) {
        this.departmentList.splice(i,1);
        this.toastr.successToastr(data.affectedRows + ' Department Deleted Successfully !', 'Success');
      } else {
        
      }
    })
  }

  add() {
    this.departmentList.push({name:'', created_at:moment().format('YYYY-MM-DD'), first_name:this.user.first_name, is_create: true});
  }


}

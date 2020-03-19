import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  user:any = '';
  constructor(public toastr: ToastrManager, private categoryService: CategoryService, private userService : UserService, private confirmationDialogService: ConfirmationDialogService) { }
  categoryList: Array<any> = [];

  ngOnInit() {
    this.getCategories()
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  getCategories() {
    this.categoryService.getCategory({"is_active":1}).subscribe(data => {
      if (data) {
        this.categoryList = data;
      } else {
        this.categoryList = [];
      }
    });  
  }

  saveCategory(newCategory, i) {
    const roleObj = {
      name : newCategory.name,
      created_by : this.user.id,
      created_at : moment().format('YYYY-MM-DD HH:MM:00'),
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    console.log(roleObj);
    this.categoryService.createCategory(roleObj).subscribe(data => {
      if (data) {
        this.toastr.successToastr(' Category Created Successfully !', 'Success');
        this.getCategories();
      } else {
        this.getCategories();
      }
    });  
  }

  updateCategory(i, category) {
    if (!category.id || !category.name) {
      return this.toastr.errorToastr(' Validation Error !', 'Error');
    }
    const updateObj = {
      id : category.id,
      name : category.name,
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    this.categoryService.updateCategory(updateObj).subscribe(data => {
      if (data) {
        this.categoryList[i] = category;
        this.toastr.successToastr(' Category Updated Successfully !', 'Success');
      } else {
        
      }
    })
  }

  public openConfirmationDialog(i, role) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => 
      this.removeCategory(i, role)  
    )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  } 


  removeCategory(i, category) {
    const updateObj = {
      id : category.id,
      is_active : 0
    }
    this.categoryService.deleteCategory(updateObj).subscribe(data => {
      if (data) {
        this.categoryList.splice(i,1);
        this.toastr.successToastr(' Category Deleted Successfully !', 'Success');
      } else {
        
      }
    })
  }

  add() {
    this.categoryList.push({name:'', created_at:moment().format('YYYY-MM-DD'), first_name:this.user.first_name, is_create: true});
  }

}

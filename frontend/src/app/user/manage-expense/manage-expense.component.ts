import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { UserService } from '../user.service';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ExpenseService } from '../services/expense.service';
import { CategoryService } from '../services/category.service';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { format } from 'url';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, interval  } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.css']
})
export class ManageExpenseComponent implements OnInit {
  dateCustomClasses: DatepickerDateCustomClasses[];
  expenseActions:any; 
  pollingData: any;     
  user:any = '';
  dateRange:any;
  deptQueryId: any = '';
  is_access:Number = 0;
  constructor(public toastr: ToastrManager, private departmentService: DepartmentService, private userService : UserService,
     private confirmationDialogService: ConfirmationDialogService,
     private expenseService: ExpenseService,
     private categoryService: CategoryService,
     private authService: AuthService, 
     private cdref: ChangeDetectorRef,
     private http: HttpClient) {
    }
     prevPollId:any;
     expenseList: Array<any> = [];
     categoryList: Array<any> = [];
     deptList: Array<any> = [];
     userRoles: any = [];
     isAccountant: any = false;
     isAdmin: any = false;
  ngOnInit() {    
    this.expenseActions = [];
    this.pollingData = interval(1000).switchMap(() => this.http.get(environment.apiUrl + '/expenses/status')).subscribe((result: any[]) => {
      
      if (result.length > 0) {
        if (this.expenseActions.length === 0) { 
          this.prevPollId = result[0]['id'];
          this.expenseActions.push(result[0]);
        } else {
          if (result[0]['id'] != this.prevPollId) {
            this.prevPollId = result[0]['id'];
            this.expenseActions.push(result[0]);
          }
        }
      }
    });


    var date = new Date();
    date.setDate(date.getDate() - 30);
    this.dateRange = [new Date, date]

    this.dateCustomClasses = [
      { date: date, classes: ['bg-warning'] }
    ]

    this.userRoles = this.authService.loadRoles();
    if (this.userRoles.indexOf('ACCOUNTANT') > -1) {
      this.isAccountant = true;
    }
    if (this.userRoles.indexOf('ADMIN') > -1) {
      this.isAdmin = true;
    }
    
    
    this.getExpenses();
    this.getDepts();
    this.getCategories();
    this.userService.getUser({email : localStorage.getItem('user')}).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

   ngOnDestroy() {
    this.pollingData.unsubscribe();
   }

  getExpenses() {
    var start =  moment(this.dateRange[1]).format('YYYY-MM-DD HH:MM:00');
    var end =  moment(this.dateRange[0]).format('YYYY-MM-DD HH:MM:00');

    if (moment(start).isSameOrAfter(moment(end))) {
      start =  moment(this.dateRange[0]).format('YYYY-MM-DD HH:MM:00');
      end =  moment(this.dateRange[1]).format('YYYY-MM-DD HH:MM:00');
    }
    
    if (this.isAccountant || this.isAdmin) {
      this.is_access = 1;
    }
    
    this.expenseService.getExpenses({"is_active":1, start: start, end: end, is_access : this.is_access}).subscribe(data => {
      if (data) {
        this.expenseList = data;
      } else {
        this.expenseList = [];
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

  getCategories() {
    this.categoryService.getCategory({"is_active":1}).subscribe(data => {
      if (data) {
        this.categoryList = data;
      } else {
        this.categoryList = [];
      }
    });  
  }


  saveExpense(newExpense, i) {
    const expenseObj = {
      category_id : newExpense.category_id,
      dept_id : newExpense.dept_id,
      amount : newExpense.amount,
      status : 'PENDING',
      created_by : this.user.id,
      created_at : moment().format('YYYY-MM-DD HH:MM:00'),
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }

    this.expenseService.createExpense(expenseObj).subscribe(data => {
      if (data) {
        this.toastr.successToastr(data.affectedRows + ' Expense Created Successfully !', 'Success');
        this.getExpenses();
      } else {
        this.getExpenses();
      }
    });  
  }

  updateExpense(i, expense) {
    const updateObj = {
      id : expense.id,
      category_id : expense.category_id,
      dept_id : expense.dept_id,
      amount : expense.amount,
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    this.expenseService.updateExpense(updateObj).subscribe(data => {
      if (data) {
        this.expenseList[i] = expense;
        this.toastr.successToastr(data.affectedRows + ' Expense Updated Successfully !', 'Success');
      } else {
        
      }
    });
  }

  approveExpense(i, expense) {
    const updateObj = {
      id : expense.id,
      status : expense.status,
      amount : expense.amount,
      updated_at : moment().format('YYYY-MM-DD HH:MM:00')
    }
    this.expenseService.approveExpense(updateObj).subscribe(data => {
      if (data) {
        this.expenseList[i] = expense;
        this.toastr.successToastr(data.affectedRows + ' Expense Approved Successfully !', 'Success');
      } else {
        
      }
    });
  }


  public openConfirmationDialog(i, expense, is_approve) {
    var confirmText = "Do you really want to delete ?"
    if (is_approve) {
      confirmText = "Do you really want to approve ?"
    }
    this.confirmationDialogService.confirm('Please confirm..', confirmText)
    .then((confirmed) => {
      if( is_approve) {
        this.approveExpense(i, expense);
      }else {
        this.removeExpense(i, expense);  
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  
  removeExpense(i, expense) {
    const updateObj = {
      id : expense.id,
      is_active : 0
    }
    this.expenseService.deleteExpense(updateObj).subscribe(data => {
      if (data) {
        this.expenseList.splice(i,1);
        this.toastr.successToastr(data.affectedRows + ' Expense Deleted Successfully !', 'Success');
      } else {        
      }
    })
  }

  add() {
    this.expenseList.push({category_id:'', dept_id:'', amount:'', status:'PENDING', created_at:moment().format('YYYY-MM-DD'), first_name:this.user.first_name , is_create: true});
  }


  onValueChange(value: Date): void {
    if (value) {
      this.dateRange = value;
    }    
  }


  ngAfterContentChecked() {
    this.dateRange = this.dateRange
    this.cdref.detectChanges();
  }

  search () {
    this.getExpenses()
  }

  clear() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    this.dateRange = [new Date, date]
    this.deptQueryId = '';
    this.getExpenses()
  }




}



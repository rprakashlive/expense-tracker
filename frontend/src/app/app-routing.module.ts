import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/guards/auth.guard';
import { LoginComponent  } from './user/login/login.component';
import { DashboardComponent  } from './user/dashboard/dashboard.component';
import { ManageExpenseComponent  } from './user/manage-expense/manage-expense.component';
import { RoleComponent  } from './user/role/role.component';
import { DepartmentComponent  } from './user/department/department.component';
import { CategoryComponent  } from './user/category/category.component';
import { UserRoleComponent  } from './user/user-role/user-role.component';
import { UserDepartmentComponent  } from './user/user-department/user-department.component';
import { ManageUserComponent  } from './user/manage-user/manage-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'user/login',  component: LoginComponent},
  { path: 'user/dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user/manage-expenses',  component: ManageExpenseComponent, canActivate: [AuthGuard] },
  { path: 'user/manage-roles',  component: RoleComponent, canActivate: [AuthGuard] },
  { path: 'user/manage-departments',  component: DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'user/manage-categories',  component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'user/map-roles',  component: UserRoleComponent, canActivate: [AuthGuard] },
  { path: 'user/map-departments',  component: UserDepartmentComponent, canActivate: [AuthGuard] },
  { path: 'user/manage-users',  component: ManageUserComponent, canActivate: [AuthGuard] },  
  { path: '**', redirectTo: '/user/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

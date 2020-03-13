import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from 'ngx-bootstrap';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ng6-toastr-notifications';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { TokenInterceptor } from './user/interceptor/token.interceptor';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { ManageExpenseComponent } from './user/manage-expense/manage-expense.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DepartmentComponent } from './user/department/department.component';
import { RoleComponent } from './user/role/role.component';
import { CategoryComponent } from './user/category/category.component';
import { UserRoleComponent } from './user/user-role/user-role.component';
import { UserDepartmentComponent } from './user/user-department/user-department.component';
import { ManageUserComponent } from './user/manage-user/manage-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SpinnerComponent,
    ManageExpenseComponent,
    ConfirmationDialogComponent,
    SidebarComponent,
    DepartmentComponent,
    RoleComponent,
    CategoryComponent,
    UserRoleComponent,
    UserDepartmentComponent,
    ManageUserComponent
  ],
  entryComponents: [ConfirmationDialogComponent],

  imports: [
    BrowserModule,
    MatNativeDateModule,
    PerfectScrollbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    BsDropdownModule.forRoot(),

    PaginationModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    SpinnerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

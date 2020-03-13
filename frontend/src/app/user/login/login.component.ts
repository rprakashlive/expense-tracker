import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserRoleService } from '../services/user-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router, private userRoleService: UserRoleService) { }
  
  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/user/dashboard']);
    }
  }


  onLoginSubmit = () => {
      let user = {
        username: this.username,
        password: this.password
      }
      this.authService.loginUser(user).subscribe(data => {
        if (data) {
          this.authService.storeUserData(data.token, data.user);
          this.authService.setLoggedIn(true);
          this.userRoleService.getMyRoles({is_active : 1}).subscribe(roleArr => {
            var roles = [];
            roleArr.forEach(element => {
              var uppercase = element.name.toUpperCase()
              roles.push(uppercase);
            });
            this.authService.setCurrentUserObj({user : data.user, roles : roles});  
            localStorage.setItem('roles', JSON.stringify(roles))
            this.router.navigate(['/user/dashboard']);
          });
        } else {
          this.router.navigate(['/user/login']);
        }
      });  
  }
}

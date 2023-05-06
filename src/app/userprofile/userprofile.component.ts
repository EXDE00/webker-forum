import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent {

  loginActive: boolean = false; //set email, if signup changed state
  signupActive: boolean = false;

  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private userService: UserService, protected authService: AuthService) { }

  activateLogin() {
    this.loginActive = true;
    this.signupActive = false;
  }

  activateSignup() {
    this.loginActive = false;
    this.signupActive = true;
  }

  onLogout(){
    this.authService.logout().then(_ => {
      this.userService.activeUser = undefined;
      this.router.navigateByUrl('/homepage');
    }).catch(_ => {
      console.error('Logout error. This is really awkward...');
    });
  }
}

/*login() {
    this.loading = true;

    if (this.email.value != null && this.password.value != null) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        console.log(cred);
      }).catch(error => {
        console.log(error);
        this.loading = false;
      });
    }
  }*/
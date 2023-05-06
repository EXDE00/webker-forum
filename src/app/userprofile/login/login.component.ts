import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  loading: boolean = false;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  async onLogin() {
    this.loading = true;

    this.auth.login(this.loginForm.get('email')?.value as string,
      this.loginForm.get('password')?.value as string).then(cred => {
        //Set active user
        this.userService.setLoggedInUser(this.loginForm.get('email')?.value);
        this.router.navigateByUrl('/homepage');
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.loading = false;
      });
  }
}

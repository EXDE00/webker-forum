import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordAgain: new FormControl(''),
  });  

  @Output() regEvent = new EventEmitter<string>();

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  async onSignup() {
    if(!(this.signUpForm.get('password')?.value as string === this.signUpForm.get('passwordAgain')?.value as string)){
      console.error('Error, passwords do not match!');
      return;
    }

    this.auth.signup
      (this.signUpForm.get('email')?.value as string,
        this.signUpForm.get('password')?.value as string)
      .then(cred => {
        const user: User = {
          email: this.signUpForm.get('email')?.value as string,
          username: this.signUpForm.get('name')?.value as string,
          role: 0
        };
        
        this.userService.create(user).then(_ => {
          console.log('User created successfully');
        }).catch(error => {
          console.log(error);
        });

        
        this.regEvent.emit(this.signUpForm.get('email')?.value as string);
      }).catch(error => {
        console.error(error);
      });
  }
}

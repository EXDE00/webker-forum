import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { UserprofileComponent } from './userprofile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    UserprofileComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserprofileModule { }

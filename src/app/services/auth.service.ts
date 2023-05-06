import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean = false;

  constructor(private auth: AngularFireAuth, private userService: UserService) {}

  login(email: string, password: string) {
    this.userLoggedIn = true;
    this.userService.setLoggedInUser(email);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.userLoggedIn = false;
    return this.auth.signOut();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';
  activeUser?: User = undefined;

  constructor(private afs: AngularFirestore) { }

  //CRUD

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).add(user);
  }

  setLoggedInUser(email: string) {
    let result: Observable<QuerySnapshot<User>> = this.afs.collection<User>(this.collectionName, ref => ref.where("email", "==", email)).get();
    //set the variables and the user
    let subscription = result.subscribe((value) => {
      this.activeUser = {
        id: value.docs[0].id,
        username: value.docs[0].data().username as string,
        email: value.docs[0].data().email as string,
        role: value.docs[0].data().role as number
      };
      subscription.unsubscribe();
    });
    return result;
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  update(user: User) {
    //let result = this.afs.collection<User>(this.collectionName, ref => ref.where("email", "==", user.email)).valueChanges();
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }
}

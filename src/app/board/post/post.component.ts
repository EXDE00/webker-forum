import { Component } from '@angular/core';

import { Post } from '../../shared/models/post-model';
import { BoardManagerService } from 'src/app/services/board-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ThreadService } from 'src/app/services/thread.service';
import { Thread } from 'src/app/shared/models/thread-model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  postInp: any = {};
  postObject: Post = new Post();
  postForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl(''),
    password: new FormControl(''),
    postAsAnon: new FormControl('')
  });

  constructor(private boardServ: BoardManagerService,
    private postService: PostService, private threadService: ThreadService,
    protected auth: AuthService, protected userService: UserService) { }

  addPost() {

    //If we're creating a new thread
    if (this.boardServ.postMode === 'New thread') {
      let threadObject: Thread = new Thread();
      threadObject.email = this.postForm.get('email')?.value;
      threadObject.subject = this.postForm.get('subject')?.value;
      threadObject.date = Timestamp.fromDate(new Date());
      threadObject.content = this.postForm.get('content')?.value;
      threadObject.password = this.postForm.get('password')?.value;
      threadObject.boardRef = this.boardServ.activeBoard?.id as string;
      if (this.auth.userLoggedIn){
        threadObject.userRef = this.userService.activeUser?.id as string; 
      } else {
        threadObject.userRef = null;
      }
      if (!this.postForm.get('postAsAnon')?.value) {
        threadObject.name = this.postForm.get('name')?.value;
      } else {
        threadObject.name = 'Anonymous';
      }


      this.threadService.createThread(threadObject);

      //If we're creating a new comment/post
    } else { //TODO ADD BOARDREF, USERREF
      this.postObject.date = new Date();
      this.postObject.email = this.postForm.get('email')?.value;
      this.postObject.subject = this.postForm.get('subject')?.value;
      this.postObject.content = this.postForm.get('content')?.value;
      this.postObject.password = this.postForm.get('password')?.value;
      if (!this.postForm.get('postAsAnon')?.value) {
        this.postObject.name = this.postForm.get('name')?.value;
      } else {
        this.postObject.name = 'Anonymous';
      }

      //this.threadService.createThread(this.postObject);

      //this.boardServ.postList.push({ ...this.postObject });
    }
  }

  ngOnInit() {
    if (this.userService.activeUser) {
      this.postForm.get('name')?.setValue(this.userService.activeUser.username);
      this.postForm.get('name')?.disable();
      this.postForm.get('email')?.setValue(this.userService.activeUser.email);
      this.postForm.get('email')?.disable();
      this.postForm.get('password')?.disable();
    }
  }
}

import { Component } from '@angular/core';

import { Post } from '../../shared/models/post-model';
import { BoardManagerService } from 'src/app/services/board-manager.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  postInp: any = {};
  postObject: Post = new Post(); 
  formData = new FormData();

  constructor(private boardServ: BoardManagerService, private http: HttpClient) {}

  addPost(){
    this.postObject.date = new Date();
    this.boardServ.postList.push( {...this.postObject} );
  }
}

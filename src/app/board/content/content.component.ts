import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post-model'
import { BoardManagerService } from 'src/app/services/board-manager.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {  

  postNo1: Post = new Post("exName2", "test@gmail.com", new Date(),
   "This is another test post", "test", undefined, undefined,
    "192.168.0.10", "dasa", 3);
  postNo2: Post = new Post("exName", "test@gmail.com", new Date(), "This is a test post",
   "testsub2", undefined, undefined, "192.168.0.2", "asd", 1);

  constructor(protected boardServ: BoardManagerService){}

  ngOnInit(){
    this.boardServ.postList.push(this.postNo1);
    this.boardServ.postList.push(this.postNo2);
  }

  ngOnDestroy(){
    this.boardServ.postList = [];
  }

}

import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post-model'
import { BoardManagerService } from 'src/app/services/board-manager.service';
import { Board } from 'src/app/shared/models/board-model';
import { Router } from '@angular/router';
import { ThreadService } from 'src/app/services/thread.service';
import { Thread } from 'src/app/shared/models/thread-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {  

  constructor(protected boardServ: BoardManagerService, protected threadService: ThreadService, private router: Router){}

  ngOnInit(){
    //this.boardServ.readThreadsByBoard(this.boardServ.activeBoard as Board);
    const boardName = this.router.url.split('/').pop() as string;
    this.boardServ.readBoardByName(boardName).subscribe(board => {
      this.boardServ.readThreadsByBoard(board.docs[0]);
    });
  }
  
  onReply(thread: Thread){
    this.threadService.readAllPostsByThread(thread).subscribe(_ => {
      this.threadService.threadActive = true;
      this.threadService.currThread = thread;
      this.threadService.commentList.forEach(f => {
        console.log("on reply collName: " + f.at(0)?.id);
      });
    });
  }

  ngOnDestroy(){
    //clear postlist
    this.boardServ.postList = [];
  }

}

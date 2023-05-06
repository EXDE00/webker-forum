import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post-model'
import { BoardManagerService } from 'src/app/services/board-manager.service';
import { Board } from 'src/app/shared/models/board-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy, OnChanges {  

  constructor(protected boardServ: BoardManagerService, private router: Router){}

  ngOnInit(){
    //this.boardServ.readThreadsByBoard(this.boardServ.activeBoard as Board);

    const boardName = this.router.url.split('/').pop() as string;
    this.boardServ.readBoardByName(boardName).subscribe(board => {
      this.boardServ.readThreadsByBoard(board.docs[0])
    });
  }

  ngOnChanges(){ 
    this.boardServ.readThreadsByBoard(this.boardServ.activeBoard as Board);
  }
  

  ngOnDestroy(){
    this.boardServ.postList = [];
  }

}

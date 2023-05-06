import { Component, OnInit } from '@angular/core';
import { BoardManagerService } from '../services/board-manager.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  forumName: String = "Webker 2023 forum";

  constructor(protected boardServ: BoardManagerService ) { }

  ngOnInit(){
    this.boardServ.readAllBoards();
  }

}

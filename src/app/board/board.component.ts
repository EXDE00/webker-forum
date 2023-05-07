import { Component } from '@angular/core';
import { BoardManagerService } from '../services/board-manager.service';
import { Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(protected boardServ: BoardManagerService, protected threadServ: ThreadService, private router: Router){}

  ngOnInit(){
    let name: string | undefined = this.router.url.split('/').pop();
    this.boardServ.readBoardByName(name as string);
    this.threadServ.threadActive = false;
  }
}

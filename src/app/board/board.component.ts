import { Component } from '@angular/core';
import { BoardManagerService } from '../services/board-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(protected boardServ: BoardManagerService, private router: Router){}

  ngOnInit(){
    let name: string | undefined = this.router.url.split('/').pop();
    this.boardServ.readBoardByName(name as string);
  }
}

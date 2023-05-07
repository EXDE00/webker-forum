import { Component, OnInit } from '@angular/core';
import { BoardManagerService } from '../services/board-manager.service';
import { UserService } from '../services/user.service';
import { Board } from '../shared/models/board-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  forumName: String = "Webker 2023 forum";

  boardForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ]),
    description: new FormControl('')
  });

  constructor(protected boardServ: BoardManagerService, protected userServ: UserService ) { }

  ngOnInit(){
    this.boardServ.readAllBoards();
  }

  onDelete(board: Board){
    this.boardServ.readBoardByName(board.name as string).forEach(b => {
      this.boardServ.deleteBoard(b.docs[0].id as string);
    })
  }

  onModify(board: Board){
    const brd = new Board();

    brd.name = this.boardForm.get('name')?.value as string;
    brd.description = this.boardForm.get('description')?.value as string;
    this.boardServ.readBoardByName(board.name as string).forEach(b => {
      brd.id = b.docs[0].id as string;
      this.boardServ.modifyBoard({...brd});
    })
  }

  addBoard(event: Event){
    event.preventDefault();
    let brd = new Board();
    
    brd.name = this.boardForm.get('name')?.value as string;
    brd.description = this.boardForm.get('description')?.value as string;

    console.log(brd.name + " " + brd.description)
    
    this.boardServ.createBoard(brd);
  }

}

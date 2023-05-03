import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../shared/models/post-model';

@Injectable({
  providedIn: 'root'
})
export class BoardManagerService {
  activeBoard?: String = "x";
  adminStatus: number = 0;
  postList: Array<Post> = []; //pull from db
  boardList: Array<string> = ["Random","Site-development","Technology"]; //pull from db

  boardChange(brd: string) {
    if (this.boardList.includes(brd)) {
      this.activeBoard = brd;
      this.router.navigate(['/board/' + brd]);
    } else {
      console.error("Invalid board.");
    }
  }

  constructor(private router: Router) { }
}

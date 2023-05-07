import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../shared/models/post-model';
import { Board } from '../shared/models/board-model';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore'
import { Observable, map, of } from 'rxjs';
import { Thread } from '../shared/models/thread-model';
import { withXsrfConfiguration } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardManagerService {

  collectionName = "Boards";
  activeBoard?: Board = new Board();

  postMode: string = "New thread";
  postList: Array<Thread> = []; //pull from db
  //postList: Observable<Thread[]> = new Observable;
  boardList: Array<Board> = []; //pull from db

  constructor(private router: Router, private afs: AngularFirestore) { }

  createBoard(board: Board) {
    return this.afs.collection<Board>(this.collectionName).add({...board});
  }

  readAllBoards() {
    let collection = this.afs.collection<Board>(this.collectionName).get();

    collection.subscribe(doc => {
      const boards: Array<Board> = [];
      doc.forEach(d => {
        const board = d.data() as Board;
        board.id = d.id;
        board.name = d.data().name;
        board.description = d.data().description;
        boards.push(board);
      });
      this.boardList = boards;
    })

    return collection;
  }

  readBoardByName(name: string) {
    let result: Observable<QuerySnapshot<Board>> = this.afs.collection<Board>(this.collectionName, ref => ref.where("name", "==", name)).get();
    //set the variables and the user
    let subscription = result.subscribe((value) => {
      this.activeBoard = {
        id: value.docs[0].id,
        name: value.docs[0].data().name as string,
        description: value.docs[0].data().description as string,
      };
      subscription.unsubscribe();
    });
    return result;
  }

  /*readThreadsByBoard(brd: Board){
    let ret = this.afs.collection<Thread>("Threads", ref => ref.where('boardRef', '==', brd.id)).get();

    let ret = this.afs.collection<Thread>("Threads", ref => ref.where('boardRef', '==', brd.id)).get();
      const threadList = ret.pipe(map((docs: { docs: any[]; }) => docs.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return {id, ...data };
    })));

    threadList.subscribe(posts => {
      this.postList = of(posts);
    })
    return threadList;
    ret.subscribe(docs => {
      this.postList = docs.docs;
      docs.forEach(doc => {
        this.postList
      })
    });
    return ret;
  }*/

  readThreadsByBoard(brd: Board) {
    console.log("readThreadsByBoard: " + brd.id)
    let result: Observable<QuerySnapshot<Thread>> = this.afs.collection<Thread>("Threads", ref => ref.where("boardRef", "==", brd.id)).get();
    //set the variables and the user
    result.subscribe((value) => {
      value.forEach(v => {
        this.postList.push(new Thread(
          v.data()['name'] as string,
          v.data()['email'] as string,
          v.data()['date'] as Timestamp,
          v.data()['content'] as string,
          v.data()['subject'] as string,
          v.data()['password'] as string,
          v.id,
          v.data()['boardRef'] as string,
          v.data()['userRef'] as string
        ));
      });
    });
    return result;
  }

  modifyBoard(board: Board) {
    return this.afs.collection<Board>(this.collectionName).doc(board.id).set(board);
  }

  deleteBoard(id: string) {
    return this.afs.collection<Board>(this.collectionName).doc(id).delete();
  }

  boardChange(brd: Board) {
    if (this._boardListNameCheck(brd.name as string)) {
      this.activeBoard = brd;
      this.router.navigate(['/board/' + brd.name as string]);
    } else {
      console.error("Invalid board.");
    }
  }

  _boardListNameCheck(brd: string): boolean {
    for (let i = 0; i < this.boardList.length; i++) {
      if (this.boardList.at(i)?.name === brd) {
        return true;
      }
    }
    return false;
  }
}

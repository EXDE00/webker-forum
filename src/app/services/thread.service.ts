import { Injectable } from '@angular/core';
import { Thread } from '../shared/models/thread-model';
import { Board } from '../shared/models/board-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  collectionName = 'Threads';

  constructor(private afs: AngularFirestore) { }

  createThread(post: Thread){
    return this.afs.collection<Thread>(this.collectionName).add({...post});
  }

  readAllThreadsByBoard(board: Board){
    this.afs.collection<Board>(this.collectionName, ref => ref.where("boardRef", "==", board.id)).get();
  }

  modifyThread(post: Thread){
    if(post.id)
      return this.afs.collection<Thread>(this.collectionName).doc(post.id).set(post);
    else{
      console.error("Error when passing post: No id");
      return false;
    }
  }

  deleteThread(id: string){
    return this.afs.collection<Thread>(this.collectionName).doc(id).delete();
  }
}

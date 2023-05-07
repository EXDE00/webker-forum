import { Injectable } from '@angular/core';
import { Thread } from '../shared/models/thread-model';
import { Board } from '../shared/models/board-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Post } from '../shared/models/post-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  collectionName = 'Threads';
  threadActive: boolean = false;
  currThread?: Thread = undefined;
  commentList: Observable<Post[]> = new Observable;

  constructor(private afs: AngularFirestore) { }

  createThread(post: Thread){
    return this.afs.collection<Thread>(this.collectionName).add({...post});
  }

  createPost(post: Post){
    return this.afs.collection<Post>('Posts').add({...post});
  }

  readAllThreadsByBoard(board: Board){
    return this.afs.collection<Board>(this.collectionName, ref => ref.where("boardRef", "==", board.id)).get();
  }

  readAllPostsByThread(thread: Thread){
    let ret = this.afs.collection<Post>("Posts", ref => ref.where('threadRef', '==', thread.id)).valueChanges();
    ret.subscribe(_ => {
      this.commentList = ret;
    });
    return ret;
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

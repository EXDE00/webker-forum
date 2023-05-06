import { Injectable } from '@angular/core';
import { Post } from '../shared/models/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  collectionName = 'Posts';

  constructor() { }

  createPost(post: Post){

  }

  readAllPostsByThread(){

  }

  modifyPost(post: Post){

  }

  deletePost(id: string){

  }
}

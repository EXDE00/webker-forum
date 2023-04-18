import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    BoardComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
  ]
})
export class BoardModule { }

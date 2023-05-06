import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { PostComponent } from './post/post.component';
import { ContentComponent } from './content/content.component';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // import the HttpClientModule


@NgModule({
  declarations: [
    BoardComponent,
    PostComponent,
    ContentComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // add the HttpClientModule to the imports array
  ]
})
export class BoardModule { }

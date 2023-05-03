import { Component } from '@angular/core';
import { BoardManagerService } from '../services/board-manager.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent {
  forumName: String = "TMP name";

  constructor(protected boardServ: BoardManagerService ) { }

}

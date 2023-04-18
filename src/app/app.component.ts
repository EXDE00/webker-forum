import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = 'forum';
  activePage: string = '';
  routes: Array<string> = [];

  constructor(private router: Router){

  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if( this.routes.includes(currentPage)) {
        this.activePage = currentPage;
      }
    })
  }

  changePage(activePage: string){
    this.router.navigateByUrl(activePage);
  }


}

import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-scuola';
  isMainPage = false;

  constructor(private router : Router){
    this.router.events.subscribe(evento => {
      if(evento instanceof NavigationEnd){
        this.isMainPage = evento.urlAfterRedirects === "/";
      }
    })
  }

}

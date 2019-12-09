import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" routerLink="/">Muzyka z Angular2</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/music" routerLinkActive="active"> Szukaj muzyki </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/playlist" routerLinkActive="active"> Twoje Playlisty </a>
        </li>
      </ul>
    </div>
  </nav>
  `,
  styles: []
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

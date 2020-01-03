import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  template: `
  
  <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">

    <a class="navbar-brand" routerLink="/">
      <img src="favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
      SpotifyPlaylists
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/music" routerLinkActive="active">Szukaj muzyki</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/playlist" routerLinkActive="active"> Twoje Playlisty </a>
        </li>
      </ul>
    </div>

    <playlist-selector></playlist-selector>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </nav>
  
  <!-- DRUGA OPCJA Navbaru -->

  <!--
  <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
    <a class="navbar-brand" routerLink="/">
      <img src="favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
      SpotifyPlaylists by arka
    </a>

    <playlist-selector></playlist-selector>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
        
        <li class="nav-item">
          <a class="nav-link" routerLink="/music" routerLinkActive="active">Szukaj muzyki</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/playlist" routerLinkActive="active"> Twoje Playlisty </a>
        </li>

      </ul>

    </div>
  </nav>
  -->


  `,
  styles: []
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

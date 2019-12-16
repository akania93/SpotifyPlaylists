import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'playlist-detail',
  template: `
    <div *ngIf="!playlist">
      <p>Wybierz <b>playlistę</b>!</p>
    </div>
    <div *ngIf="playlist">
      <h3 class="card-title">{{playlist.name}}</h3>
      <p class="card-text">Tracks: {{playlist.tracks}}</p>
      <p *ngIf="playlist.favourite">Ulubiona</p>
      <div class="form-group">
        <button class="btn btn-warning float-xs-right" (click)="edit(playlist)">Edytuj</button>
      </div>
    </div>
  `,
  styles: []
})
export class PlaylistDetailComponent implements OnInit {

  playlist;

  // Nawigacja z kodu/
  // Można było oczywiście użyc 'routerLink' na buttonie.
  edit(playlist) {
    this.router.navigate(['playlist', playlist.id, 'edit'])
  }

  constructor(private activeRoute:ActivatedRoute,
              private playlistsService:PlaylistsService,
              private router:Router) { }

  ngOnInit() {
    // Reaguje na zmiany w parametrach przez co jest to:
    // REAKTYWNY Komponent
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['id']);
      if(id) {
        this.playlist = this.playlistsService.getPlaylist(id);
      }
    })
  }
}
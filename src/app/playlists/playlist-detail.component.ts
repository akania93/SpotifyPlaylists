import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService, Playlist } from './playlists.service';

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
        <button [routerLink]="['/playlist', playlist.id, 'edit']"  class="btn btn-secondary float-right">Edytuj</button>
      </div>
    </div>
  `,
  styles: []
})
export class PlaylistDetailComponent implements OnInit {

  playlist: Playlist;

  constructor(private activeRoute:ActivatedRoute,
              private playlistsService:PlaylistsService) { }

  ngOnInit() {
    // Reaguje na zmiany w parametrach przez co jest to:
    // REAKTYWNY Komponent
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['id']);
      if(id) {
        this.playlistsService.getPlaylist(id)
          .subscribe((playlist: Playlist) => {
            this.playlist = playlist;
          });
      }
    })
  }
}
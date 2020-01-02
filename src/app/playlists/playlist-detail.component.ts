import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService, Playlist } from './playlists.service';

@Component({
  selector: 'playlist-detail',
  styles: [
    `
    h3.card-title span {
      content: ' ';
      position: absolute;
      width: 40px;
      height: 3px;
      left: -5px;
      top: 35px;
    }
    `
  ],
  template: `
    <div *ngIf="!playlist">
      <p>Wybierz <b>playlistę</b>!</p>
    </div>

    <div *ngIf="playlist">
      <h3 class="card-title position-relative">
        {{playlist.name}}
        <span [ngStyle]="{ background: playlist.color }"></span>
      </h3>
      <p class="card-text">{{playlist.description}}</p>

      <track-list [tracks]="playlist.tracks" [allowDelete]="true" [playlistId]="playlist.id"></track-list>

      <p *ngIf="playlist.favourite">Ulubiona</p>
      <div class="form-group">
        <button [routerLink]="['/playlist', playlist.id, 'edit']"  class="btn btn-secondary float-right">Edytuj</button>
      </div>
    </div>
  `
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
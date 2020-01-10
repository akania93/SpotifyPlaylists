import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from './playlists.service';
import { Playlist } from '../models';

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

    i.fa-star {
      color: #ffc107;
      font-size: 20px;
      vertical-align: top;
    }

    .playlist-category {
      float: right;
      font-size: 14px;
    }
    .playlist-category .make-italic {
      font-style: italic;
    }
    `
  ],
  template: `
    <div *ngIf="!playlist">
      <p>Wybierz <b>playlistę</b>!</p>
    </div>

    <div *ngIf="playlist">
      <h3 class="card-title position-relative">
        {{playlist.name}} <i *ngIf="playlist.favourite" class="fa fa-star pl-1"></i>
        <span [ngStyle]="{ background: playlist.color }"></span>
      </h3>
      <p class="card-text">{{playlist.description}}</p>
      <p class="playlist-category">Kategoria: <span class="make-italic">{{playlist.category}}</span></p>

      <track-list [tracks]="playlist.tracks" [isInsidePlaylist]="true" (onDeleteTrack)="deleteTrackFromPlaylist($event)"></track-list>

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

  deleteTrackFromPlaylist(track) {
    this.playlistsService.deleteTrackFromPlaylist(this.playlist, track);
  }

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
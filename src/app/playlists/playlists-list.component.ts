import { Component, OnInit } from '@angular/core';
import { PlaylistsService, Playlist } from './playlists.service';

@Component({
  selector: 'playlists-list',
  styles: [
    `
    .playlist-row {
      border-left: 8px solid transparent;
    }
    .table-active {
      background-color: rgba(26, 27, 25, 0.2) !important;
    }

    table tbody tr {
      cursor: pointer;
    }

    table tbody tr td {
      vertical-align: middle;
    }
    table tbody tr td label {
      margin-bottom: 0;
    }

    i.fa-star {
      color: #ffc107;
    }
    `
  ],
  template: `
  <div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Utworów </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let playlist of playlists; let i = index" class="playlist-row" 
          [ngStyle]="{ borderLeftColor: playlist.color }"
          [routerLink]="[playlist.id]" routerLinkActive="table-active">
          <td> {{ i + 1 }}. </td>
          <td> 
            {{ playlist.name }} 
            <span *ngIf="playlist.favourite"><i class="fa fa-star pl-1"></i></span> 
          </td>
          <td> {{ playlist.tracks.length }} </td>
          <td><button class="btn btn-sm btn-danger" (click)="delete(playlist)"><i class="fa fa-times"></i></button></td>
        </tr>
      </tbody>
    </table>
    <div class="form-group">
      <button 
        [routerLink]="['new']" class="btn btn-success float-right">
        Nowa Playlista
      </button>
    </div>
  </div>
  `
})
export class PlaylistsListComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(private playlistsService: PlaylistsService) { }

  ngOnInit() {
    this.playlistsService.getPlaylistsStream$()
    .subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

  delete(playlist: Playlist) {
    this.playlistsService.deletePlaylist(playlist);
  }

}

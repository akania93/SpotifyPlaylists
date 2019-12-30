import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'playlist-form',
  template: `
    <div *ngIf="playlist">
      <div class="form-group">
        <label>Nazwa:</label>
        <input type="text" [(ngModel)]="playlist.name" class="form-control">
      </div>
      <div class="form-group">
        <label>Utwory:</label>
        <input type="text" [value]="playlist.tracks + ' utwory'" disabled class="form-control">
      </div>
      <div class="form-group">
        <label>Kolor:</label>
        <input type="color" [(ngModel)]="playlist.color">
      </div>
      <div class="form-group">
        <label><input type="checkbox" [(ngModel)]="playlist.favourite">
          Ulubiona</label>
      </div>
      <div class="form-group">
        <button class="btn btn-success float-xs-right" (click)="save(playlist)">Zapisz</button>
      </div>
    </div>
  `,
  styles: []
})
export class PlaylistFormComponent implements OnInit {

  playlist;

  constructor(private activeRoute:ActivatedRoute,
              private playlistsService:PlaylistsService,
              private router:Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['id']);
      if(id) {
        this.playlist = this.playlistsService.getPlaylist(id);
      } else { // w sytuacji gdy nie przyjdzie 'id' tylko routing z "new"
        this.playlist = this.playlistsService.createPlaylist();
      }
    })
  }

  save(playlist) {
    this.playlistsService.savePlaylist(playlist);
    // Nawigacja z kodu
    this.router.navigate(['playlist', playlist.id]);
  }
}
import { Component, OnInit } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';
import { PlaylistsService } from '../playlists/playlists.service';

@Component({
  selector: 'playlist-selector',
  template: `
    <div class="input-group">
      <label class="col-form-label mr-3">Aktywna Playlista: </label>
      <select class=" form-control" [ngModel]="selectedId"
      (ngModelChange)="setSelected($event)">
        <option *ngFor="let playlist of playlists" [value]="playlist.id">
          {{playlist.name}} ({{playlist.tracks?.length}})
        </option>
      </select>
    </div>
  `,
  styles: []
})
export class PlaylistSelectorComponent implements OnInit {

  selectedId;
  playlists = [];

  constructor(private playlistSelectionService: PlaylistSelectionService,
              private playlistsService: PlaylistsService) { }

  setSelected(id) {
    this.playlistSelectionService.select(id);
  }

  ngOnInit() {
    this.playlistSelectionService.getSelectionStream$()
    .subscribe(id => {
      this.selectedId = id;
    })

    this.playlistsService.getPlaylistsStream$()
    .subscribe(playlists => {
      this.playlists = playlists;
    })
  }
}
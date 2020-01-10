import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistSelectionService } from './playlist-selection.service';
import { Track } from '../models';

@Component({
  selector: 'track-list',
  styles: [
    `
    table {
      font-size: 14px;
    }
    table a {
      color: #212529;
    }
    table a:hover {
      text-decoration: none;
      color: #007bff;
    }

    table tbody tr td {
      vertical-align: middle;
    }
    table tbody tr td label {
      margin-bottom: 0;
    }
    `
  ],
  template: `
  <audio #audio_id controls style="width: 100%; height: 35px;"></audio>
  
  <table class="table table-striped">
    <thead>
      <tr>
        <!-- W filmie 8.1 i 7.5 jest spis kolumn z APi -->
        <th> # </th>
        <th> Nazwa </th>
        <th> Wykonawca </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let track of tracks; let i=index">
        <!--<td>{{track.track_number}}</td>-->
        <td>{{i+1}}</td>
        <td><a [href]="track.external_url_spotify" target="_blank">{{track.name}}</a></td>
        <td><a [href]="track.artists[0].external_url_spotify" target="_blank">{{track.artists[0].name}}</a></td>
        <td class="btn-group float-right" role="group">
          <!-- <i class="fa fa-play"></i> -->
          <button class="btn btn-sm btn-primary mr-1" *ngIf="track.preview_url" (click)="play(audio_id, track)"><i class="fa fa-play"></i></button>
          <button class="btn btn-sm btn-success" (click)="addToPlaylist(track)"><i class="fa fa-plus"></i></button>
          <button class="btn btn-sm btn-danger ml-1" *ngIf="isInsidePlaylist"  (click)="onDelete(track)"><i class="fa fa-times"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
  `
})
export class TrackListComponent implements OnInit {

  @Input() tracks: Track[];
  @Input() isInsidePlaylist: boolean = false;
  @Output() onDeleteTrack = new EventEmitter();

  constructor(private playlistSelectionService: PlaylistSelectionService) {  }

  ngOnInit() {  }

  play(audio, track: Track) {
    audio.volume = 0.1;

    if(audio.src != track.preview_url) {
      audio.src = track.preview_url;
      audio.play();
    }
    else if(audio.paused){
      audio.play();
    } else {
      audio.pause();
    }
  }

  addToPlaylist(track: Track) {
    this.playlistSelectionService.addToPlaylist(track);
  }

  onDelete(track: Track) {
    this.onDeleteTrack.emit(track);
  }

}

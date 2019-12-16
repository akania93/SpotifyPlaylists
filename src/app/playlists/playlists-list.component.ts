import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'playlists-list',
  styles: [
    `
    .playlist-row {
      border-bottom: 2px solid transparent;
    }
    .table-active {
      background-color: rgba(241, 211, 0, 0.2) !important;
    }
    `
  ],
  template: `
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th> # </th>
          <th> Nazwa </th>
          <th> Utworów </th>
          <th> Ulubiona </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let playlist of playlists; let i = index" class="playlist-row" 
          [ngStyle]="{ borderBottomColor: playlist.color }"
          [routerLink]="[playlist.id]" routerLinkActive="table-active">
          <td> {{ i + 1 }}. </td>
          <td> {{ playlist.name }} </td>
          <td> {{ playlist.tracks }} </td>
          <td>
            <label><input type="checkbox" [(ngModel)]="playlist.favourite" (click)="$event.stopPropagation();">
              Ulubiona</label>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form-group">
      <button 
        [routerLink]="['new']" class="btn btn-success float-xs-right">
        Nowa Playlista
      </button>
    </div>
  </div>
  `
})
export class PlaylistsListComponent implements OnInit {

  @Input() playlists;

  constructor() { }

  ngOnInit() {}

}

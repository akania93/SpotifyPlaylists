import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'playlist-detail',
  template: `
    <p class="card-text">Tracks: {{playlist.tracks}}</p>
    <p *ngIf="playlist.favourite">Ulubiona</p>
    <div class="form-group">
      <button class="btn btn-warning float-xs-right" (click)="edit(playlist)">Edytuj</button>
    </div>
  `,
  styles: []
})
export class PlaylistDetailComponent implements OnInit {

  @Input() playlist;
  @Output() onEdit = new EventEmitter();

  edit(playlist) {
    this.onEdit.emit(playlist);
  }

  constructor() { }

  ngOnInit() {
  }

}

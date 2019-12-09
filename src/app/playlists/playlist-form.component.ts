import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'playlist-form',
  template: `
    <div>
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

  @Input() playlist;
  @Output() onSave = new EventEmitter();

  save(playlist) {
    this.onSave.emit(playlist);
  }

  constructor() { }

  ngOnInit() {
  }

}

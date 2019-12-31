import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'playlist-form',
  styles: [
    `
    #PlaylistForm.not-submitted.was-validated .form-control.ng-pristine.ng-untouched:invalid {
      background-image: none;
      border: 1px solid #ced4da;
    }

    .was-validated .form-control.ng-pristine.ng-untouched:invalid:focus {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .was-validated .form-control:valid {
      background-image: none;
      border: 1px solid #ced4da;
    }
    `
  ],
  template: `
    <div *ngIf="playlist">
      <!-- Referencja już nie do DOM tylko do dyrektywy ngForm, to samo można na ngModel -->
      <form id="PlaylistForm" #formRef="ngForm" (ngSubmit)="save(playlist, formRef.valid)" class="was-validated" [ngClass]="{'not-submitted': !formRef.submitted}" novalidate>
        <div class="form-group">
          <!-- Jeśli używamy ngModel w ngForm to musimy dodać pola 'name' -->
          <label>Nazwa:</label>
          <input type="text" #nameRef="ngModel" [(ngModel)]="playlist.name" name="name" class="form-control" minlength="3" required>
          <div class="invalid-feedback" *ngIf="nameRef.touched || nameRef.dirty || formRef.submitted">
            <div class="" *ngIf="nameRef.errors?.required">To pole jest wymagane</div>
            <div class="" *ngIf="nameRef.errors?.minlength">To pole musi mieć przynajmniej {{nameRef.errors.minlength.requiredLength}} znak(i)/-ów</div>
          </div>
        </div>
        <div class="form-group">
          <label>Utwory:</label>
          <input type="text" [value]="playlist.tracks + ' utwory'" disabled class="form-control">
        </div>
        <div class="form-group">
          <label>Kolor:</label>
          <input type="color" [(ngModel)]="playlist.color" name="color">
        </div>
        <div class="form-group">
          <label><input type="checkbox" [(ngModel)]="playlist.favourite" name="favourite">
            Ulubiona</label>
        </div>
        <div class="form-group">
          <button class="btn btn-success float-right" type="submit">Zapisz</button>
        </div>
      </form>
    </div>
  `,
})
export class PlaylistFormComponent implements OnInit {

  playlist;

  constructor(private activeRoute: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['id']);
      if (id) {
        this.playlist = this.playlistsService.getPlaylist(id);
      } else { // w sytuacji gdy nie przyjdzie 'id' tylko routing z "new"
        this.playlist = this.playlistsService.createPlaylist();
      }
    })
  }

  save(playlist, valid) {
    if (!valid)
      return;

    this.playlistsService.savePlaylist(playlist);
    // Nawigacja z kodu
    this.router.navigate(['playlist', playlist.id]);
  }
}
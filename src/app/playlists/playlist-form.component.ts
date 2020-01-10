import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistsService } from './playlists.service';
import { Playlist } from '../models';

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

    .was-validated .form-control.ng-untouched:valid {
      background-image: none;
      border: 1px solid #ced4da;
    }

    .playlist-form-table {
      font-size: 12px;
    }

    .color-label {
      vertical-align: bottom;
      margin-right: 8px;
    }
    .color-input {
      width: 50px;
      height: 40px;
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
            <div *ngIf="nameRef.errors?.required">To pole jest wymagane</div>
            <div *ngIf="nameRef.errors?.minlength">To pole musi mieć przynajmniej {{nameRef.errors.minlength.requiredLength}} znak(i)/-ów</div>
          </div>
        </div>

        <div class="form-group">
          <label>Opis:</label>
          <textarea #descriptionRef="ngModel" [(ngModel)]="playlist.description" name="description" class="form-control" minlength="10" required></textarea>
          <div class="invalid-feedback" *ngIf="descriptionRef.touched || descriptionRef.dirty || formRef.submitted">
            <div *ngIf="descriptionRef.errors?.required">To pole jest wymagane</div>
            <div *ngIf="descriptionRef.errors?.minlength">To pole musi mieć przynajmniej {{descriptionRef.errors.minlength.requiredLength}} znak(i)/-ów</div>
          </div>
        </div>

        <div class="form-group" *ngIf="playlist.tracks.length">
          <label>Utwory:</label>     
          <table class="table table-sm table-striped playlist-form-table">
            <tbody>
              <tr *ngFor="let track of playlist.tracks; let i = index">
                <td>{{i+1}}.</td>
                <td>{{track.name}}</td>
                <td><span *ngFor="let artist of track.artists">{{artist.name}}, </span></td>
                <td class="float-right">{{msToTime(track.duration_ms)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!--
        <div class="form-group">
          <label class="w-100"> Radio Kategoria:</label>
          <div *ngFor="let radioCategory of radioCategories" class="form-check-inline">
            <label class="form-check-label">
              <input type="radio" class="form-check-input" name="radioCategory" 
                      [(ngModel)]="playlist.radioCategory" [value]="radioCategory"> 
              {{radioCategory}} 
            </label>
          </div>
        </div>
        -->

        <div class="form-group">
          <label class="w-100">Kategoria:</label>
          <select class="form-control" [(ngModel)]="playlist.category" name="category">
            <option *ngFor="let category of categories" 
                    [value]="category">{{category}}</option>
          </select>
        </div>

        <div class="form-group">
          <label class="color-label">Kolor:</label>
          <input type="color" class="color-input" [(ngModel)]="playlist.color" name="color">

          <label class="float-right"><input type="checkbox" [(ngModel)]="playlist.favourite" name="favourite">
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

  playlist: Playlist;
  // radioCategories = ['Filmowa', 'Rockowa', 'Inne'];
  categories = [];

  constructor(private activeRoute: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['id']);
      if (id) {
        this.playlistsService.getPlaylist(id)
          .subscribe((playlist: Playlist) => {
            this.playlist = playlist;
            this.playlist = Object.assign({}, playlist); // nie wymagane bo dane z serwera i tak są.
          });
      } else { // w sytuacji gdy nie przyjdzie 'id' tylko routing z "new"
        this.playlist = this.playlistsService.createPlaylist();
      }
    });

    this.playlistsService.getPlaylistCategories()
    .subscribe((response: any[]) => {
      this.categories = response;
    });
  }

  save(playlist: Playlist, valid) {
    if (!valid)
      return;

    this.playlistsService.savePlaylist(playlist)
      .subscribe((addedOrUpdatedPlaylist: Playlist) => {
        // Nawigacja z kodu
        this.router.navigate(['playlist', addedOrUpdatedPlaylist.id]);
      });
  }

  private msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    function pad(n) {
      return ('00' + n).slice(-2);
    }
    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  }
}
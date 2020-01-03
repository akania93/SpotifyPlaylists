import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'album-details',
  template: `
    <div class="row mt-4" *ngIf="album">
      <div class="col-sm-12 col-md-5 mt-4">

        <album-card class="card" [album]="album"></album-card>
        
      </div>
      <div class="col-sm-12 col-md-7">
        <h4 class="display-3 mb-2 float-right">Utwory</h4>
        
        <track-list [tracks]="album.tracks.items"></track-list>

      </div>
    </div>
  `,
  styles: []
})
export class AlbumDetailsComponent implements OnInit {

  constructor(private musicSearchService:MusicSearchService,
              private activeRoute: ActivatedRoute) 
  { 
  }

  album;

  ngOnInit() {
    let id = this.activeRoute.snapshot.params['album_id'];
    
    this.musicSearchService.getAlbum(id) // 0sNOF9WDwhWunNAHPD3Baj
    .subscribe(album => {
      this.album = album;
    });
  }

}
import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'album-details',
  template: `
    <div class="row mt-1" *ngIf="album">
      <div class="col">
        <album-card class="card" [album]="album"
        ></album-card>
      </div>
      <div class="col">
        <h4 class="display-3 mb-2 float-xs-right">Utwory</h4>
        <track-list [tracks]="album.tracks.items"
        ></track-list>
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
    console.log('album_id: ', id);
    
    this.musicSearchService.getAlbum(id) // 0sNOF9WDwhWunNAHPD3Baj
    .subscribe(album => {
      this.album = album;
    });
  }

}
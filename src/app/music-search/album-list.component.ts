import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'album-list',
  template: `
    <div class="card-deck card-deck-justify">

    <div class="card-deck card-deck-justify">
     <album-card [album]="album"
                 [routerLink]="['album', album.id]" 
                 class="card"
                 *ngFor="let album of albums | async "
      ></album-card>
    </div>
  `,
  styles: [`
    .card {
      margin-left: 0;
    }

    .card-deck-justify {
      justify-content: space-between;
    }
  `]
})
export class AlbumListComponent implements OnInit {

  albums: Observable<any>;

  constructor(private musicSearchService: MusicSearchService) { }

  ngOnInit() {
    // this.musicSearchService.getAlbumsStream()
    //   .subscribe (
    //     (value) => { this.albums = value; }
    //   );

    this.albums = this.musicSearchService.getAlbumsStream();
  }
}

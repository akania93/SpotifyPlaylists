import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'album-list',
  template: `
    <div class="card-deck justify-content-around">
     <album-card [album]="album"
                 [routerLink]="['album', album.id]" 
                 class="card"
                 *ngFor="let album of albums | async "
      ></album-card>
    </div>
    `,
  styles: []
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

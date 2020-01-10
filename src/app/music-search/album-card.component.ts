import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models';

@Component({
  selector: 'album-card',
  template: `
    <img class="card-img-top img-fluid" [src]="image.url">
    <div class="card-img-overlay">
      <h6 class="card-title">{{album.name}}</h6>
    </div>
  `,
  styles: [`
    :host(){
      flex: 0 0 31% !important;
      margin-bottom: 0.625rem  !important;
      overflow:hidden;
      margin-right: 0;
    }

    :host():hover {
      cursor: pointer;
    }

    :host():hover .card-img-overlay{
      top: 100%;
    }
    
    .card-img-overlay{
      background: rgba(0,0,0,0.8);
      top:70%;
      color: #fff;
      font-size: 1em !important;
      transition: .2s top ease-out;
    }

    @media only screen and (min-width: 576px) and (max-width: 1200px) {
      .card-img-overlay .card-title {
        font-size: 14px;
      }
    }

  `]
})
export class AlbumCardComponent implements OnInit {

  @Input('album')
  set setAlbum(album) {
    this.album = album;
    this.image = album.images[0];
  }

  album: Album;
  image;

  constructor() { }

  ngOnInit() {
  }

}

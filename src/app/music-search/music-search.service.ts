import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MusicSearchService {

  albums = [];
  albumsStream = new Subject();

  constructor(private http: Http) {
    // pierwsze wywołanie na sztywno 'witcher'
    this.search('witcher')
  }

  getAlbumsStream() {
    return Observable
      .from(this.albumsStream)
      .startWith(this.albums)
  }

  search(query) {
    let url = `https://api.spotify.com/v1/search?type=album&market=PL&query=${query}`;

    this.http.get(url)
      .map((response: Response) => {
        let data = response.json();
        return data.albums.items;
      })
      .do(albums => { this.albums = albums })
      .subscribe((albums) => {
        this.albumsStream.next(this.albums);
      },
        (error) => {
          console.log("music-search.service ERROR: ", error);
        })
  }

  getAlbum(id) {
    let url = `https://api.spotify.com/v1/albums/${id}`;

    return this.http.get(url)
      .map((response: Response) => (response.json()));
  }

  // mapper
  mapSpotifyAlbumToApiAlbum(album) {
    let mappedAlbum = {
      name: album.name,
      images: album.images,
      tracks: album.tracks.items.map(tr => {
        return {
          name: tr.name,
          external_id: tr.id,
          duration_ms: tr.duration_ms,
          external_url_spotify: tr.external_urls.spotify,
          preview_url: tr.preview_url,
          artists: tr.artists.map(ar => {
            return {
              name: ar.name,
              external_url_spotify: ar.external_urls.spotify
            };
          })
        };
      })
    }

    return mappedAlbum;
  }

}

interface Album {
  name: string,
  images: any[],
  tracks: Track[]
}
interface Track {
  name: string,
  external_id: string,
  duration_ms: number,
  external_url_spotify: string,
  preview_url: string,
  artists: Artist[]
}
interface Artist {
  name: string,
  external_url_spotify: string
}

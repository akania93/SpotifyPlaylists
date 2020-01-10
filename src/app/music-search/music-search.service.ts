import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MusicSearchService {

  albums: Album[] = [];
  albumsStream = new Subject<Album[]>();

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
      .subscribe((albums: Album[]) => {
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
    let mappedAlbum: Album = {
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

export interface Album {
  name: string,
  images: any[],
  tracks: Track[]
}
export interface Playlist {
  id?: number,
  name: string,
  description: string,
  color: string,
  favourite: boolean,
  category: string,
  tracks: Track[]
}
export interface Track {
  id?: number,
  name: string,
  external_id: string,
  duration_ms: number,
  external_url_spotify: string,
  preview_url: string,
  artists: Artist[]
}
export interface Artist {
  id?: number,
  name: string,
  external_url_spotify: string
}
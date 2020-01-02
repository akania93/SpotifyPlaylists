import { Injectable, Inject, Optional } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PlaylistsService {

  server_url = 'http://localhost:3000/playlists/';
  playlists = []
  playlists$ = new Subject<Playlist[]>();

  /* Wstrzykiwanie playlist z pliku */
  // Tutaj musimy użyć pełnego zapisu bo to nie jest klasa (to string) - nie ma typu.
  // constructor(@Optional() @Inject('PlaylistsData') playlistsData) {
  //   this.playlists = playlistsData === null? this.playlists : playlistsData;
  // }

  // TODO: zrobić delete.
  constructor(private http: Http) {  }

  getPlaylists() {
    return this.http.get(this.server_url)
          .map( response => response.json())
          .subscribe( playlist => {
            this.playlists = playlist;
            this.playlists$.next(this.playlists);
          })
  }

  getPlaylistsStream$() {
    if(!this.playlists.length){
      this.getPlaylists();
    }
    return Observable.from(this.playlists$).startWith(this.playlists);
  }

  getPlaylist(id) {
    return this.http.get(this.server_url + id)
        .map( response => response.json())
  }

  createPlaylist(): Playlist {
    return {
      name: '',
      description: '',
      tracks: [],
      color: '#FF0000',
      favourite: false
    };
  }

  savePlaylist(playlist) {
    let request;

    // Jeśli obiekt o takim id już jest w liście => podmieniamy.
    if(playlist.id){
      request = this.http.put(this.server_url + playlist.id, playlist);
    }
    else { // nowy element
      request = this.http.post(this.server_url, playlist);
    }

    return request.map(response => response.json())
    .do(addedOrUpdatedPlaylist => {
      // W tym momencie ktoś w innym miejscu mógł dodać też playlisty.
      // Więc aby wszystkie komponenty były zaktualizowane robię:
      this.getPlaylists();
    });
    // subscribe będzie w playlist-form.component
  }
}

export interface Playlist {
  name: string,
  description: string,
  tracks: any[],
  color: string,
  favourite: boolean
}
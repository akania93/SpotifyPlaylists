import { Injectable, Inject, Optional } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PlaylistsService {

  server_url = 'http://localhost:3000/playlists/';
  // server_url_playlistCategories = 'http://localhost:3000/playlistCategories/';

  // server_url = 'http://localhost:51706/api/Playlists/';
  server_url_playlistCategories = 'http://localhost:51706/api/PlaylistCategories/aslist';

  playlists = [];
  playlists$ = new Subject<Playlist[]>();

  /* Wstrzykiwanie playlist z pliku */
  // Tutaj musimy użyć pełnego zapisu bo to nie jest klasa (to string) - nie ma typu.
  // constructor(@Optional() @Inject('PlaylistsData') playlistsData) {
  //   this.playlists = playlistsData === null? this.playlists : playlistsData;
  // }

  constructor(private http: Http) {  }

  getPlaylists() {
    return this.http.get(this.server_url)
          .map( response => response.json())
          .subscribe( playlists => {
            this.playlists = playlists;
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
      color: '#FF0000',
      favourite: false,
      category: '',
      tracks: []
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

  addTrackToPlaylist(playlistId, track) {
    let playlist = this.playlists.find(playlist => playlist.id === parseInt(playlistId));
    playlist.tracks.push(track);
    this.savePlaylist(playlist).subscribe();
  }

  deletePlaylist(playlist) {
    this.http.delete(this.server_url + playlist.id)
    .subscribe(response => {
      this.getPlaylists();
    });
  }

  deleteTrackFromPlaylist(playlist, track) {
    let index = 0;
    for( var i = 0; i < playlist.tracks.length; i++)
      if ( playlist.tracks[i].id === track.id) 
        index = i;

    playlist.tracks.splice(index, 1); 
    this.savePlaylist(playlist).subscribe();
  }

  getPlaylistCategories() {
    return this.http.get(this.server_url_playlistCategories)
      .map( response => response.json())
  }

}

export interface Playlist {
  name: string,
  description: string,
  color: string,
  favourite: boolean,
  category: string,
  tracks: any[]
}
export interface Track {
  name: string,
  external_id: string,
  duration_ms: number,
  external_url_spotify: string,
  preview_url: string,
  artists: any[]
}
export interface Artist {
  name: string,
  external_url_spotify: string
}
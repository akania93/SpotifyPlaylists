import { Injectable, Inject, Optional } from '@angular/core';

@Injectable()
export class PlaylistsService {

  playlists = []

  // Tutaj musimy użyć pełnego zapisu bo to nie jest klasa (to string) - nie ma typu.
  constructor(@Optional() @Inject('PlaylistsData') playlistsData) {
    this.playlists = playlistsData === null? this.playlists : playlistsData;
  }

  getPlaylists() {
    return this.playlists;
  }

  createPlaylist() {
    var newPlaylist = {
      name: '',
      tracks: 0,
      color: '#FF0000',
      favourite: false
    };
    return Object.assign({}, newPlaylist);
  }

  savePlaylist(playlist) {
    // Jeśli obiekt o takim id już jest w liście => podmieniamy.
    if(playlist.id){
      let index = this.playlists.findIndex((old_playlist) => (
        old_playlist.id === playlist.id
      ));
      this.playlists.splice(index, 1, playlist)
    }
    else { // nowy element
      playlist.id = Date.now();
      this.playlists.push(playlist);
    }
  }
}

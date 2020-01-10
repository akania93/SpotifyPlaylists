import { Injectable } from '@angular/core';
import { PlaylistsService, Track, Playlist } from '../playlists/playlists.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PlaylistSelectionService {

  selectedId;
  selectedIdStream$ = new Subject();

  constructor(private playlistsService: PlaylistsService) { 
    
    this.playlistsService.getPlaylistsStream$()
      .subscribe((playlists: Playlist[]) => {
        if(!this.selectedId)
          this.select(playlists[0]);
      })
  }

  getSelectionStream$() {
    return Observable.from(this.selectedIdStream$).startWith(this.selectedId);
  }

  select(playlistId) {
    this.selectedId = playlistId;
    this.selectedIdStream$.next(this.selectedId);
  }

  addToPlaylist(track: Track) {
    this.playlistsService.addTrackToPlaylist(this.selectedId, track);
  }
}

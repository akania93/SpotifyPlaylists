import { Component, OnInit, Inject } from '@angular/core';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  
  selected = null;
  edited = {

  }
  playlists = [];
  mode="none"

  constructor(private playlistsService:PlaylistsService) { 

  }

  ngOnInit() {
    this.playlists = this.playlistsService.getPlaylists();
  }

  select(playlist){
    if(playlist !== this.selected)
    this.mode = "selected"
    this.selected = playlist;
  }

  edit(playlist){
    this.mode = "edit";
    this.edited = Object.assign({}, playlist); // obiekt edited przekazujemy do <playlist-form>
    this.selected = playlist;
  }

  createNew(){
    this.mode = "edit";
    let newPlaylist = this.playlistsService.createPlaylist();
    this.selected = newPlaylist;
    this.edited = newPlaylist;
  }

  save(playlist){
    this.playlistsService.savePlaylist(playlist);
    
    // Wyjście z trybu edycji do widoku playlisty (selected)
    this.selected = playlist;
    this.mode = "selected";
  }
}

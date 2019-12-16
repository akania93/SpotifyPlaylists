import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './playlists.service';

@Component({
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  
  playlists = [];

  constructor(private playlistsService:PlaylistsService) { }

  ngOnInit() {
    this.playlists = this.playlistsService.getPlaylists();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MusicSharedModule } from '../music-shared/music-shared.module';

import { PlaylistsComponent } from './playlists.component';
import { ContentCardComponent } from './content-card.component';
import { PlaylistFormComponent } from './playlist-form.component';
import { PlaylistsListComponent } from './playlists-list.component';
import { PlaylistDetailComponent } from './playlist-detail.component';

import { PlaylistsService } from './playlists.service';
// import playlistsData from './playlists.data';

// routing
import { routerModule } from './playlist.routing'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MusicSharedModule,
    routerModule
  ],
  declarations: [
    PlaylistsComponent,
    ContentCardComponent,
    PlaylistFormComponent,
    PlaylistsListComponent,
    PlaylistDetailComponent
  ],
  exports: [
    // Co możemy wyeksportować z tego modułu. 
    // Czyli w app.component.html używamy <playlists></playlists>.
    PlaylistsComponent
  ],
  providers: [   
    // To można podmieniac jak zrobisz klasę która extends PlaylistsService. 
    // I zmieniasz tylko w 1 miejscu gdy potrzebujesz.
    // { provide: PlaylistsService, useClass: EXTENDED_PlaylistsService }
    // Natomiast skrócony zapis jesli Serwis się nazywa tak samo jak klasa
    //PlaylistsService,

    //---- 1. Z pliku
    // Jeśli nie ma to byc klasa, czyli bez iperatora 'new'. Moga to być tablice, obiekt itp.
    // A klucz podajemy w stringu tutaj 'PlaylistsData'
    //{provide: 'PlaylistsData', useValue: playlistsData}
    
    //---- 2. useFactory dodanie do pliku
    /*
      {provide: 'PlaylistsData', useFactory: ()=>{
      playlistsData.push({
        id: new Date().getDate(), 
        name: "Dodana z provide useFactory",
        tracks: 10,
        color: "#ddd",
        favourite: true 
      });
      return playlistsData;
    }},
    */

    //---- 3. Wstrzykiwanie jednej zależności w drugą
    /*
      {provide: 'PlaylistsExampleData', useValue: playlistsData},
      {provide: 'PlaylistsData', useFactory: (data)=>{
        data.push({
          id: new Date().getDate(), 
          name: "Dodana z provide useFactory",
          tracks: 10,
          color: "#ddd",
          favourite: true 
        });
        return data;
      }, deps:['PlaylistsExampleData']}
    */

  ]
})
export class PlaylistsModule { }

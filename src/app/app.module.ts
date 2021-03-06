import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// moje moduły
import { PlaylistsModule } from './playlists/playlists.module';
import { MusicSearchModule } from './music-search/music-search.module';
import { MusicSharedModule } from './music-shared/music-shared.module';

// serwisy
import { PlaylistsService } from './playlists/playlists.service';
import { PlaylistSelectionService } from './music-shared/playlist-selection.service';
import { AuthService } from './auth.service';

// routing
import { routerModule } from './app.routing';

// components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // moje moduły
    PlaylistsModule,
    MusicSearchModule,
    MusicSharedModule,
    routerModule
  ],
  providers: [
    AuthService,
    PlaylistsService,
    PlaylistSelectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private auth: AuthService) {
    auth.getToken();
  }
}
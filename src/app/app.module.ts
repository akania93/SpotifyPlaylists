import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PlaylistsModule } from './playlists/playlists.module';
import { MusicSearchModule } from './music-search/music-search.module';

// routing
import { routerModule } from './app.routing';

import { AuthService } from './auth.service';

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
    PlaylistsModule,
    MusicSearchModule,
    routerModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private auth: AuthService) {
    auth.getToken();
  }
}
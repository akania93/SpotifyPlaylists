import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlbumListComponent } from './album-list.component';
import { MusicSearchComponent } from './music-search.component';
import { AlbumCardComponent } from './album-card.component';
import { MusicSearchService } from './music-search.service';
import { AlbumSearchFormComponent } from './album-search-form.component';
import { AlbumDetailsComponent } from './album-details.component';
import { MusicSharedModule } from '../music-shared/music-shared.module';

// routing
import { routerModule } from './music-search.routing';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MusicSharedModule,
    routerModule
  ],
  declarations: [
    MusicSearchComponent, AlbumListComponent, AlbumCardComponent, AlbumSearchFormComponent, AlbumDetailsComponent
  ],
  exports: [
    MusicSearchComponent
  ],
  providers: [
    MusicSearchService
  ]
})
export class MusicSearchModule { }

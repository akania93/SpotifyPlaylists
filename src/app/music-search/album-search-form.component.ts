import { Component, OnInit } from '@angular/core';
import { MusicSearchService } from './music-search.service'
import { FormGroup, FormControl } from '@angular/forms'
import { query } from '@angular/core/src/animation/dsl';
import { switchMap } from 'rxjs/operator/switchMap';

@Component({
  selector: 'album-search-form',
  template: `
    <form [formGroup]="searchForm">
      <div class="input-group">
        <input type="text" formControlName="query" name="query" class="form-control" placeholder="Słowa kluczowe"  />
      </div>
    </form>
  `,
  styles: []
})
export class AlbumSearchFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private musicSearchService: MusicSearchService) { 
    
    this.searchForm = new FormGroup({
      'query': new FormControl('') // Mozna tu pisac początkową
    });

    this.searchForm.get('query').valueChanges
    .debounceTime(800)
    .distinctUntilChanged()
    .filter(query => query.length >= 3)
    .subscribe(
      (value) => {
        this.musicSearchService.search(value);
        console.log('Wyszukałem: ', value);
      }
    )
  }

  ngOnInit() { }

}
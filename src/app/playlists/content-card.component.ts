import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'content-card',
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{title}}</h4>
        <ng-content class="card-text"></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class ContentCardComponent implements OnInit {

  @Input() title;
  @Input('content') text;

  constructor() { }

  ngOnInit() {
  }

}

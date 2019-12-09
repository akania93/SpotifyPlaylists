import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'content-card',
  template: `
    <div class="card">
      <div class="card-block">
        <h4 class="card-title">{{title}}</h4>
        <ng-content class="card-text"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
    .card {
      padding: 15px;
    }
    `
  ],
})
export class ContentCardComponent implements OnInit {

  @Input() title;
  @Input('content') text;

  constructor() { }

  ngOnInit() {
  }

}

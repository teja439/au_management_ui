import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-loader',
  templateUrl: './overlay-loader.component.html',
  styleUrls: ['./overlay-loader.component.css']
})
export class OverlayLoaderComponent implements OnInit {

  constructor() { }

  @Input() loadText;
  loaderActiveClass = "loading-overlay is-active"
  loaderClass = "loading-overlay"

  ngOnInit(): void {
  }

}

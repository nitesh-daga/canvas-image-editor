import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'canvas-toolbar',
  templateUrl: './canvas-toolbar.component.html',
  styleUrls: ['./canvas-toolbar.component.scss']
})
export class CanvasToolbarComponent implements OnInit {
  @Output() emitAction = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  switchAspectRation(){
    this.emitAction.emit('switch-aspect-ratio');
  }

  clearCanvas(){
    this.emitAction.emit('clear-canvas');
  }

}

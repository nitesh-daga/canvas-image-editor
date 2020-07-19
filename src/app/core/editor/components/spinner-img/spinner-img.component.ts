import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'spinner-img',
  templateUrl: './spinner-img.component.html',
  styleUrls: ['./spinner-img.component.scss']
})
export class SpinnerImgComponent implements OnInit {
  @ViewChild('img') el: ElementRef;
  private _imgSrc: String;
  showModal: boolean = false;
  @Input() set imgSrc(v : String) {
    this._imgSrc = v;
    this.loading = true;
  }
  get imgSrc() {
    return this._imgSrc;
  }

  loading: boolean = true

  onLoad() {
    this.loading = false;
  }

  constructor() { }

  ngOnInit() { }

  showImageModal()
  {
    this.showModal = true;
    
  }
  
  hideImageModal()
  {
    this.showModal = false;
  }


}
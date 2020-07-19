import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('fabriccanvas') fabriccanvas: ElementRef;
  private canvasElem: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private canvasAspectRatio: number = 9 / 16;
  public containerWidth:any = this.canvasAspectRatio*60+'vh';
  public containerHeight:any = '60vh';
  imageList: any = [];
  fabric: fabric.Canvas;
  imageObject: HTMLImageElement;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.canvasElem = this.canvas.nativeElement;
    this.canvasContext = this.canvasElem.getContext('2d');

    this.fabric = new fabric.Canvas(this.fabriccanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    let fixWidth = this.canvasElem.clientWidth;
    let fixHeight = this.canvasElem.clientHeight;
    this.setCanvasHeightWidth(fixWidth,fixHeight);
  }

  setCanvasHeightWidth(width,height){
    this.canvasElem.width = width;
    this.canvasElem.height = height;
    this.fabric.setWidth(width);
    this.fabric.setHeight(height);
  }

  drawImagesInCanvas(){
    this.imageList.forEach((image,index) => {
      if(index==0){
        this.drawBackGroundImage(image);
      }else{
        this.drawFabricImage(image);
      }
    });
  }
  

  drawBackGroundImage(imgSrc){
    var _this = this;
    // Loading Image Dynamically 
    _this.imageObject = new Image(); 
    _this.imageObject.src = imgSrc; 
    _this.imageObject.onload = function(){
        // Draw Blur in Canvas by scaling it 10 times 
        _this.renderBlurImage();

        //Draw Image as per Aspect Ratio 
        _this.renderFitImageOnCanvas(_this.imageObject);
      };
  }

  renderBlurImage(){
    // Draw Blur in Canvas by scaling it 10 times 
    const blurCanvas: HTMLCanvasElement = document.createElement('canvas');
    blurCanvas.width = this.canvasElem.width/9;
    blurCanvas.height = this.canvasElem.height/9;
    const blurCanvasContext: CanvasRenderingContext2D = blurCanvas.getContext('2d');
    blurCanvasContext.drawImage(this.imageObject, 0, 0, blurCanvas.width, blurCanvas.height);
    this.canvasContext.drawImage(blurCanvas, 0, 0, blurCanvas.width * 10, blurCanvas.height * 10);
  }

  renderFitImageOnCanvas(imageObj){
    var _this = this;
    var canvas:any = document.getElementById('canvas');
    var imageAspectRatio = imageObj.width / imageObj.height;
    var canvasAspectRatio = canvas.clientWidth / canvas.clientHeight;
    var renderableHeight, renderableWidth, xStart, yStart;

    // If image's aspect ratio is less than canvas's we fit on height
    // and place the image centrally along width
    if(imageAspectRatio < canvasAspectRatio) {
      renderableHeight = canvas.height;
      renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
      xStart = (canvas.width - renderableWidth) / 2;
      yStart = 0;
    }

    // If image's aspect ratio is greater than canvas's we fit on width
    // and place the image centrally along height
    else if(imageAspectRatio > canvasAspectRatio) {
      renderableWidth = canvas.clientWidth
      renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
      xStart = 0;
      yStart = (canvas.clientHeight - renderableHeight) / 2;
    }

    else {
      renderableHeight = canvas.height;
      renderableWidth = canvas.width;
      xStart = 0;
      yStart = 0;
    }
    _this.canvasContext.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
  }

  drawFabricImage(imgSrc){
    var _this = this;
    
    fabric.Image.fromURL(imgSrc, function(oImg) {
      var canvas:any = document.getElementById('canvas');
      var imageAspectRatio = oImg.width / oImg.height;
      var canvasAspectRatio = canvas.clientWidth / canvas.clientHeight;
      var renderableHeight, renderableWidth, xStart, yStart;
      if(imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height;
        renderableWidth = oImg.width * (renderableHeight / oImg.height);
        xStart = (canvas.width - renderableWidth) / 2;
        yStart = 0;
      }
      else if(imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.clientWidth
        renderableHeight = oImg.height * (renderableWidth / oImg.width);
        xStart = 0;
        yStart = (canvas.clientHeight - renderableHeight) / 2;
      }
      else {
        renderableHeight = canvas.height;
        renderableWidth = canvas.width;
        xStart = 0;
        yStart = 0;
      }
      oImg.set({
        left: xStart,
        top: yStart,
        angle: 0,
        padding: 0,
        cornerSize: 10,
        hasRotatingPoint: true
      });
      oImg.scaleToWidth(Math.round(renderableWidth));
      oImg.scaleToHeight(Math.round(renderableHeight));
     _this.fabric.add(oImg);
    });
  }



  cdkImageDrop(event) {
    if(this.imageList.length==0){
      this.drawBackGroundImage(event.dragData.download_url);
    }else{
      this.drawFabricImage(event.dragData.download_url);
    }
    this.imageList.push(event.dragData.download_url);
    // Maintaining Imagelist so that we can re render
  }

  handleCanvasActions(action){
    switch (action) {
      case 'switch-aspect-ratio':
        this.switchAspectRatio();
        break;
      case 'clear-canvas':
        this.clearCanvas();
        break;
    
      default:
        break;
    }
  }

  switchAspectRatio(){
    let fixWidth = this.canvasElem.clientWidth;
    let fixHeight = this.canvasElem.clientHeight;
    this.setCanvasHeightWidth(fixHeight,fixWidth);
    const width = this.containerWidth;
    this.containerWidth = this.containerHeight;
    this.containerHeight = width;
    this.canvasAspectRatio = 1 / this.canvasAspectRatio;
    this.canvasContext.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height); 
    this.fabric.clear();
    this.drawImagesInCanvas();
  }

  clearCanvas(){
    this.canvasContext.clearRect(0, 0, this.canvasElem.width, this.canvasElem.height); 
    this.fabric.clear();
    this.imageList = [];
  }
}

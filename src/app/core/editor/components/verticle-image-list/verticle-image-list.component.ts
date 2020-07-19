import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerImgComponent } from '../spinner-img/spinner-img.component';

@Component({
  selector: 'app-verticle-image-list',
  templateUrl: './verticle-image-list.component.html',
  styleUrls: ['./verticle-image-list.component.scss']
})
export class VerticleImageListComponent implements OnInit {
  loading: boolean = false;
  ImageList: any = [];
  numPages: any;
  nextPage: any;
  currentPage: any = 1;
  pageLimit: any = 15;
  @ViewChild('spinner') spinner: SpinnerImgComponent;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.loadImageList();

  }

  loadImageList(): void{

    this.http.get(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=${this.pageLimit}`)
      .subscribe( (list: any) => {
        this.ImageList = list;
      });
  }

  onScroll(){
    this.paginateImageList();
  }

  paginateImageList(){
    this.loading = true;
    this.http.get(`https://picsum.photos/v2/list?page=${++this.currentPage}&limit=${this.pageLimit}`).subscribe(list =>{
      this.ImageList = this.ImageList.concat(list);
      this.loading = false;
    },error => {
      this.loading = false;
    })
  }

}

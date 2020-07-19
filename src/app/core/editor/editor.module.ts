import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgDragDropModule } from 'ng-drag-drop';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarLeftComponent } from './components/navigation/navbar-left/navbar-left.component';
import { ResizerComponent } from './components/navigation/resizer/resizer.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VerticleImageListComponent } from './components/verticle-image-list/verticle-image-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerImgComponent } from './components/spinner-img/spinner-img.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { CanvasToolbarComponent } from './components/canvas/canvas-toolbar/canvas-toolbar.component';


@NgModule({
  declarations: [EditorComponent, NavigationComponent, NavbarLeftComponent, ResizerComponent, SidebarComponent, LoaderComponent, VerticleImageListComponent, SpinnerImgComponent, CanvasComponent, CanvasToolbarComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NgDragDropModule.forRoot(),
    HttpClientModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }

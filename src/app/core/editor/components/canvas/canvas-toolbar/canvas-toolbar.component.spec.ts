import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasToolbarComponent } from './canvas-toolbar.component';

describe('CanvasToolbarComponent', () => {
  let component: CanvasToolbarComponent;
  let fixture: ComponentFixture<CanvasToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

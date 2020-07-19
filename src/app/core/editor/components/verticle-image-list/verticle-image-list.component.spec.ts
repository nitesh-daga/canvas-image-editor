import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticleImageListComponent } from './verticle-image-list.component';

describe('VerticleImageListComponent', () => {
  let component: VerticleImageListComponent;
  let fixture: ComponentFixture<VerticleImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticleImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticleImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

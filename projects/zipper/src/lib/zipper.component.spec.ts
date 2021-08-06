import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipperComponent } from './zipper.component';

describe('ZipperComponent', () => {
  let component: ZipperComponent;
  let fixture: ComponentFixture<ZipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

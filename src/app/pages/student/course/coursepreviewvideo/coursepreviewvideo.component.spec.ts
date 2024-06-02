import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepreviewvideoComponent } from './coursepreviewvideo.component';

describe('CoursepreviewvideoComponent', () => {
  let component: CoursepreviewvideoComponent;
  let fixture: ComponentFixture<CoursepreviewvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursepreviewvideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursepreviewvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

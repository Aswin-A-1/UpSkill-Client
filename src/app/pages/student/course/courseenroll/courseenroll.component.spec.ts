import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseenrollComponent } from './courseenroll.component';

describe('CourseenrollComponent', () => {
  let component: CourseenrollComponent;
  let fixture: ComponentFixture<CourseenrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseenrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseenrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

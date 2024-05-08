import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourselistComponent } from './instructor-courselist.component';

describe('InstructorCourselistComponent', () => {
  let component: InstructorCourselistComponent;
  let fixture: ComponentFixture<InstructorCourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorCourselistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorCourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

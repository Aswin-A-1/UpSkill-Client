import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddcourseComponent } from './instructor-addcourse.component';

describe('InstructorAddcourseComponent', () => {
  let component: InstructorAddcourseComponent;
  let fixture: ComponentFixture<InstructorAddcourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorAddcourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorAddcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseexploreComponent } from './courseexplore.component';

describe('CourseexploreComponent', () => {
  let component: CourseexploreComponent;
  let fixture: ComponentFixture<CourseexploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseexploreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseexploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

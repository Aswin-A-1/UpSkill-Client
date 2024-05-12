import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCoursevideouploadComponent } from './instructor-coursevideoupload.component';

describe('InstructorCoursevideouploadComponent', () => {
  let component: InstructorCoursevideouploadComponent;
  let fixture: ComponentFixture<InstructorCoursevideouploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorCoursevideouploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorCoursevideouploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

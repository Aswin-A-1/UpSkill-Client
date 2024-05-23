import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAddprofileComponent } from './instructor-addprofile.component';

describe('InstructorAddprofileComponent', () => {
  let component: InstructorAddprofileComponent;
  let fixture: ComponentFixture<InstructorAddprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorAddprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorAddprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

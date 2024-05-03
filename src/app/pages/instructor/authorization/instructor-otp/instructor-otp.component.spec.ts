import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorOtpComponent } from './instructor-otp.component';

describe('InstructorOtpComponent', () => {
  let component: InstructorOtpComponent;
  let fixture: ComponentFixture<InstructorOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

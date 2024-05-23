import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfiledetailsComponent } from './instructor-profiledetails.component';

describe('InstructorProfiledetailsComponent', () => {
  let component: InstructorProfiledetailsComponent;
  let fixture: ComponentFixture<InstructorProfiledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorProfiledetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorProfiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

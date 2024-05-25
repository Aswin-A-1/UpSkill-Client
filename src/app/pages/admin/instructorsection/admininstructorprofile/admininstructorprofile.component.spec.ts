import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininstructorprofileComponent } from './admininstructorprofile.component';

describe('AdmininstructorprofileComponent', () => {
  let component: AdmininstructorprofileComponent;
  let fixture: ComponentFixture<AdmininstructorprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmininstructorprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmininstructorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

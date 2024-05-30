import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincourselistComponent } from './admincourselist.component';

describe('AdmincourselistComponent', () => {
  let component: AdmincourselistComponent;
  let fixture: ComponentFixture<AdmincourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmincourselistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmincourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincoursecategoryComponent } from './admincoursecategory.component';

describe('AdmincoursecategoryComponent', () => {
  let component: AdmincoursecategoryComponent;
  let fixture: ComponentFixture<AdmincoursecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmincoursecategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmincoursecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

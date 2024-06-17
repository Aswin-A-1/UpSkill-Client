import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorstudentlistComponent } from './instructorstudentlist.component';

describe('InstructorstudentlistComponent', () => {
  let component: InstructorstudentlistComponent;
  let fixture: ComponentFixture<InstructorstudentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorstudentlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorstudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

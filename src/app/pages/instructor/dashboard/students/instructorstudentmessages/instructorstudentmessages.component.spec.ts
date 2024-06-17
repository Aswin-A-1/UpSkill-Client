import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorstudentmessagesComponent } from './instructorstudentmessages.component';

describe('InstructorstudentmessagesComponent', () => {
  let component: InstructorstudentmessagesComponent;
  let fixture: ComponentFixture<InstructorstudentmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorstudentmessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorstudentmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

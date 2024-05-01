import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTemplateComponent } from './signup-template.component';

describe('SignupTemplateComponent', () => {
  let component: SignupTemplateComponent;
  let fixture: ComponentFixture<SignupTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

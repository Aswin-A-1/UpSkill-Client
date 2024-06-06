import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylearningsComponent } from './mylearnings.component';

describe('MylearningsComponent', () => {
  let component: MylearningsComponent;
  let fixture: ComponentFixture<MylearningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MylearningsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MylearningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
